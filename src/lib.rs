pub mod stack;

mod utils;
use crate::stack::Stack;
use wasm_bindgen::prelude::*;

///////////////////////////////////////////////////////

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}


macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

////////////////////////////////////////////////////////////

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct CHIP8 {
    memory: Vec<u8>,
    registers: Vec<u8>,
    stack: Stack<u16>,
    pc: usize,
    i: u16,
    sp: usize,
    gfx_buffer: Vec<u8>,
    delay_timer: u8,
    sound_timer: u8,
    opcode: (u8,u8),
    start_address: u16,
    font_address: u16,
}

#[wasm_bindgen]
impl CHIP8 {
    pub fn new() -> CHIP8 {
        CHIP8 {
            memory: vec![0; 4096],
            registers: vec![0; 16],
            stack: Stack::<u16>::new(),
            i: 0,
            sp: 0,
            gfx_buffer: vec![0; 64 * 48],
            delay_timer: 0,
            sound_timer: 0,
            opcode: (0,0),
            start_address: 0x200,
            font_address: 0x50,
            pc: 0x200,
        }
    }

    pub fn load_fonts(&mut self) {
        let fonts: [u8; 80] = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80, // F
        ];

        for i in 0..80 {
            self.memory[(self.font_address + i) as usize] = fonts[i as usize];
        }
    }

    pub fn get_pc(&mut self)->u16{
        //self.pc=1000;
        self.pc as u16
    }

    pub fn start_address(&self) -> u16 {
        self.start_address
    }

    pub fn get_memory_pointer(&self) -> *const u8 {
        self.memory.as_ptr()
    }

    pub fn get_graphics_pointer(&self)-> *const u8{
        self.gfx_buffer.as_ptr()
    }

    pub fn fetch_instruction(&mut self){
        self.opcode = (self.memory[self.pc],self.memory[self.pc + 1]);
    }

    pub fn move_pc(&mut self){
        self.pc += 2;
    }

    pub fn get_opcode(&self)->u16{
        let b1:u16=self.opcode.0 as u16;
        let b2:u16=self.opcode.1 as u16;
        let b1=b1<<8;
        b1+b2
    }

    pub fn decode_instruction(&mut self){
        let mut ub1=self.opcode.0&0xF0;
        let lb1=self.opcode.0&0xF;
        let mut ub2=self.opcode.1&0xF0;
        let lb2=self.opcode.1&0xF;
        ub1>>=4;
        ub2>>=4;
        let bytes=(ub1,lb1,ub2,lb2);
        console_log!("{} {} {} {} {} {}",self.opcode.0,self.opcode.1,ub1,lb1,ub2,lb2);
        match bytes{
            // (0x0,0x0,0xE,0x0)=>println!("display"),
            // (0x0,0x0,0xE,0xE)=>println!("Return"),
            // (0x0,_,_,_)=>println!("Call"),
            (0x1,_,_,_)=>self.handle_jump(bytes.1 as u16,
                bytes.2 as u16,bytes.3 as u16),
            // (0x2,_,_,_)=>println!("Call function"),
            (0x3,_,_,_)=>self.equal_instruction_register_constant(
                bytes.1,self.opcode.1
            ),
            (0x4,_,_,_)=>self.not_equal_instruction_register_constant(
                bytes.1,self.opcode.1
            ),
            (0x5,_,_,0x0)=>self.equal_instruction_register_register(
                bytes.1, bytes.2
            ),
            (0x6,_,_,_)=>{
                console_log!("Load op");
                self.registers[bytes.1 as usize]=self.opcode.1
            },

            (0x7,_,_,_)=>{
                self.registers[bytes.1 as usize]+=self.opcode.1
            }
            (0x8,_,_,0x0)=>{
                self.registers[bytes.1 as usize]=self.registers[bytes.2 as usize]
            },
            (0x8,_,_,0x1)=>{
                self.registers[bytes.1 as usize]|=self.registers[bytes.2 as usize]
            },
            (0x8,_,_,0x2)=>self.registers[bytes.1 as usize]&=self.registers[bytes.2 as usize],
            (0x8,_,_,0x3)=>self.registers[bytes.1 as usize]^=self.registers[bytes.2 as usize],
            (0x8,_,_,0x4)=>
                match self.registers[bytes.1 as usize].checked_add(self.registers[bytes.2 as usize]) {
                    Some(val) => {
                        self.registers[bytes.1 as usize]=val;
                        self.registers[0xF]=0;
                    },
                    None => {
                        self.registers[bytes.1 as usize]=255;
                        self.registers[0xF]=1;
                    }
                },
            (0x8,_,_,0x5)=>
            match self.registers[bytes.1 as usize].checked_sub(self.registers[bytes.2 as usize]){
                Some(val)=>{
                    self.registers[bytes.1 as usize]=val;
                    self.registers[0xF]=1;
                },
                None=>{
                    self.registers[bytes.1 as usize]=0;
                    self.registers[0xF]=0;
                }
            },
            (0x8,_,_,0x6)=>{
                self.registers[0xF]=self.registers[bytes.1 as usize]&1;
                self.registers[bytes.1 as usize]>>=1;
            },
            (0x8,_,_,0x7)=>
            match self.registers[bytes.2 as usize].checked_sub(self.registers[bytes.1 as usize]){
                Some(val)=>{
                    self.registers[bytes.1 as usize]=val;
                    self.registers[0xF]=0;
                },
                None=>{
                    self.registers[bytes.1 as usize]=0;
                    self.registers[0xF]=1;
                }
            },
            (0x8,_,_,0xE)=>{
                self.registers[0xF]=self.registers[bytes.1 as usize] & 0x80;
                self.registers[bytes.1 as usize]<<=1; 
            },
            (0x9,_,_,0x0)=>{
                if self.registers[bytes.1 as usize]!=self.registers[bytes.2 as usize]{
                    self.move_pc();
                }
            },
            (0xA,_,_,_)=>self.set_address(
                bytes.1 as u16, bytes.2 as u16, bytes.3 as u16
            ),
            (0xB,_,_,_)=>self.jump_address_offset(
                bytes.1 as u16, bytes.2 as u16, bytes.3 as u16
            ),
            (0xC,_,_,_)=>println!("Vx = rand() & NN"),
            (0xD,_,_,_)=>{
                // println!("draw(Vx,Vy,N)"),
                
            },
            // (0xE,_,0x9,0xE)=>println!("if key()==Vx"),
            // (0xE,_,0xA,0x1)=>println!("if key()!=Vx"),
            // (0xF,_,0x0,0x7)=>println!("vx=get_delay()"),
            // (0xF,_,0x0,0xA)=>println!("vx=get_key() blocking operation"),
            // (0xF,_,0x1,0x5)=>println!("delay_timer(Vx)"),
            // (0xF,_,0x1,0x8)=>println!("sound_timer(Vx)"),
            // (0xF,_,0x1,0xE)=>println!("I+=Vx"),
            // (0xF,_,0x2,0x9)=>println!("set I to sprite_address[Vx]"),
            // (0xF,_,0x3,0x3)=>println!("BCD to be understood"),
            // (0xF,_,0x5,0x5)=>println!("store to V0->Vx starting from I,I not mutated"),
            // (0xF,_,0x6,0x5)=>println!("load from I to V0->Vx, I not mutated"),
            (_,_,_,_)=>self.pass()
        };

        match bytes{
            (0x1,_,_,_)=>self.pass(),
            (_,_,_,_)=>self.move_pc()
        }
    }

    fn pass(&self){}

    fn get_padded_address(&self,b1:u16,b2:u16,b3:u16)->u16{
        let b1=b1<<8;
        let b2=b2<<4;
        b1+b2+b3
    }
    fn handle_jump(&mut self,b1:u16,b2:u16,b3:u16){
        self.pc=self.get_padded_address(b1,b2,b3).into();
    }

    fn set_address(&mut self,b1:u16,b2:u16,b3:u16){
        self.i=self.get_padded_address(b1,b2,b3).into();
    }

    fn jump_address_offset(&mut self,b1:u16, b2:u16,b3:u16){
        let res_address=self.get_padded_address(b1,b2,b3)+self.registers[0] as u16;
        self.pc=res_address.into();
    }

    fn equal_instruction_register_constant(&mut self,b1:u8,b2:u8){
        if self.registers[b1 as usize]==b2 {
            self.move_pc();
        }
    }

    fn not_equal_instruction_register_constant(&mut self,b1:u8,b2:u8){
        if self.registers[b1 as usize] != b2{
            self.move_pc();
        }
    }

    fn equal_instruction_register_register(&mut self,b1:u8,b2:u8){
        if self.registers[b1 as usize] == self.registers[b2 as usize]{
            self.move_pc();
        }
    }
}
