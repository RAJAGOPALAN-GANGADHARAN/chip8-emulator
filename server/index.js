import { CHIP8 } from "chip8_emulator";
import { memory } from "chip8_emulator/chip8_emulator_bg";


const chip = CHIP8.new();
const START_ADDRESS = chip.start_address();

const load_rom = () => {
	fetch('roms/pong.rom')
	.then(i => i.arrayBuffer())
		.then(buffer => {
			const rom = new DataView(buffer, 0, buffer.byteLength);
			let programMemoryPointer = chip.get_memory_pointer();
			let programMemory = new Uint8Array(memory.buffer, programMemoryPointer, 4096);

			for (let i = 0; i < rom.byteLength; i++) {
				programMemory[START_ADDRESS + i] = rom.getUint8(i);
			}
			// programMemory[START_ADDRESS] = 0x15;
			// programMemory[START_ADDRESS + 1] = 0x55;
			console.log(programMemory);
		});
}

const initialize = () => {
	chip.load_fonts();
	load_rom();
}


const renderLoop = () => {
	chip.fetch_instruction();
	console.log(chip.get_opcode().toString(16));
	chip.decode_instruction();
	console.log(chip.get_pc());
	requestAnimationFrame(renderLoop);
};

initialize();
requestAnimationFrame(renderLoop);