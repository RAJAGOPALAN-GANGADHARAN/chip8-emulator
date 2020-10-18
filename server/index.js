import { CHIP8 } from "chip8_emulator";
import { memory } from "chip8_emulator/chip8_emulator_bg";


const chip = CHIP8.new();
const START_ADDRESS = chip.start_address();
const CELL_SIZE =20;

const height = 32;
const width = 64;

const prepareCanvas = () => {
	const canvas = document.getElementById("chip8-canvas");
	canvas.height = (CELL_SIZE + 1) * height + 1;
	canvas.width = (CELL_SIZE + 1) * width + 1;
	
	return canvas.getContext('2d');
}

const _loadCallback = () => {
	drawCells();
	requestAnimationFrame(renderLoop);
}
const loadRom = async () => {
	await fetch('roms/pong.rom')
	.then(i => i.arrayBuffer())
		.then(buffer => {
			const rom = new DataView(buffer, 0, buffer.byteLength);
			let programMemoryPointer = chip.get_memory_pointer();
			let programMemory = new Uint8Array(memory.buffer, programMemoryPointer, 4096);
			
			// for (let i = 0; i < rom.byteLength; i++) {
			// 	programMemory[START_ADDRESS + i] = rom.getUint8(i);
			// }

			programMemory[START_ADDRESS] = 0xA0;
			programMemory[START_ADDRESS + 1] = 0x50;

			programMemory[START_ADDRESS + 2] = 0x60;
			programMemory[START_ADDRESS + 3] = 0x0A;

			programMemory[START_ADDRESS + 4] = 0x61;
			programMemory[START_ADDRESS + 5] = 0x05;

			programMemory[START_ADDRESS + 6] = 0xD0;
			programMemory[START_ADDRESS + 7] = 0x15;

			programMemory[START_ADDRESS +8] = 0xA0;
			programMemory[START_ADDRESS + 9] = 0x55;

			programMemory[START_ADDRESS + 10] = 0x60;
			programMemory[START_ADDRESS + 11] = 0x14;

			programMemory[START_ADDRESS + 12] = 0xD0;
			programMemory[START_ADDRESS + 13] = 0x15;

			console.log(programMemory);

			_loadCallback();
		});
}

const getIndex = (row, column) => {
	return row * width + column;
};


const drawCells = () => {
	const cellsPtr = chip.get_graphics_pointer();
	const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

	ctx.beginPath();

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++)
		{
			const idx = getIndex(row,col);
			ctx.fillStyle = (cells[idx]!=0)?"#FFFFFF":"#000000";

			ctx.fillRect(
			col * (CELL_SIZE+1) +1,
			row * (CELL_SIZE+1)+1,
			CELL_SIZE,
			CELL_SIZE
			);
		}
	}

	ctx.stroke();
};

const initialize = () => {
	chip.load_fonts();
	loadRom();
}


const renderLoop = () => {
	chip.fetch_instruction();
	let x = chip.get_opcode().toString(16);
	if (x == '0') return;
	chip.decode_instruction();
	// console.log(chip.get_pc());
	drawCells();
	requestAnimationFrame(renderLoop);
};

const ctx = prepareCanvas();
initialize();