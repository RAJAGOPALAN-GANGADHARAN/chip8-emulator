import { CHIP8 } from "chip8_emulator";
import { memory } from "chip8_emulator/chip8_emulator_bg";
var json = require('./roms/metadata.json')

const chip = CHIP8.new();
const START_ADDRESS = chip.start_address();
const CELL_SIZE =20;

const height = chip.get_height();
const width = chip.get_width();

const gfx = new Array(height * width).fill(0);

let inverseKeyMapping = {
	48:0x0,
	49:0x1,
	50:0x2,
	51:0x3,
	52:0x4,
	53:0x5,
	54:0x6,
	55:0x7,
	56:0x8,
	57:0x9,
	65:0xA,
	66:0xB,
	67:0xC,
	68:0xD,
	69:0xE,
	70:0xF,
};

const prepareCanvas = () => {
	const canvas = document.getElementById("chip8-canvas");
	canvas.height = (CELL_SIZE + 1) * height + 1;
	canvas.width = (CELL_SIZE + 1) * width + 1;
	
	return canvas.getContext('2d');
}
const fillCanvas = () => {
	ctx.beginPath();

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++)
		{
			const idx = getIndex(row, col);
			
			ctx.fillStyle = "#000000";
			
			ctx.fillRect(
			col * (CELL_SIZE) +1,
			row * (CELL_SIZE)+1,
			CELL_SIZE,
			CELL_SIZE
			);
		}
	}

	ctx.stroke();
}

const _loadCallback = () => {
	fillCanvas();
	requestAnimationFrame(renderLoop);
}
const loadRom = async (rom) => {
	await fetch('roms/'+rom)
	.then(i => i.arrayBuffer())
		.then(buffer => {
			const rom = new DataView(buffer, 0, buffer.byteLength);
			let programMemoryPointer = chip.get_memory_pointer();
			let programMemory = new Uint8Array(memory.buffer, programMemoryPointer, 4096);
			for (let i = 0; i < rom.byteLength; i++) {
				programMemory[START_ADDRESS + i] = rom.getUint8(i);
			}

			_loadCallback();
		});
}

const getIndex = (row, column) => {
	return row * width + column;
};



const drawCells = () => {

	const cellsPtr = chip.get_dirty_paint();
	const cells = new Uint16Array(memory.buffer, cellsPtr, chip.get_dirty_size());

	ctx.beginPath();

	for (var ind of cells) {
		let row = Math.floor(ind / width);
		let col = ind % width;

		gfx[ind] = 1 - gfx[ind];
		ctx.fillStyle = (gfx[ind] != 0) ? "#FFFFFF" : "#000000";
		
		ctx.fillRect(
		col * (CELL_SIZE) +1,
		row * (CELL_SIZE)+1,
		CELL_SIZE,
		CELL_SIZE
		);
	}

	ctx.stroke();
};

const keyboardDownEvent = (event) => {
	var code = event.keyCode;
	if (inverseKeyMapping[code]) {
		const keyBufferPtr = chip.get_key_buffer_pointer();
		const keyBuffer = new Uint8Array(memory.buffer, keyBufferPtr, 16);
		keyBuffer[inverseKeyMapping[code]] = 1;
		if (chip.get_block_signal())
			chip.toggle_block_signal();
	}
}

const keyboardUpEvent = (event) => {
	var code = event.keyCode;
	if (inverseKeyMapping[code]) {
		const keyBufferPtr = chip.get_key_buffer_pointer();
		const keyBuffer = new Uint8Array(memory.buffer, keyBufferPtr, 16);
		keyBuffer[inverseKeyMapping[code]] = 0;
	}
}
const initialize = (rom) => {
	chip.load_fonts();
	window.addEventListener("keydown", keyboardDownEvent);
	window.addEventListener("keyup", keyboardUpEvent);
	loadRom(rom);
	console.log(json)
}


const renderLoop = () => {
	for (var i = 0; i < 15; ++i) {
		chip.fetch_instruction();
		chip.decode_instruction();
	}
	while (chip.get_block_signal()==1) { }
	chip.post_cycle();
	if (chip.should_draw()) {
		drawCells();
		chip.draw_completed();
	}
	requestAnimationFrame(renderLoop);
};
var ctx = null
function main(rom){
	ctx = prepareCanvas();
	initialize(rom);
}
async function populate() {
	let dom = document.getElementById('roms');
	if (dom == null) return;
	for (let name in json) {
		if (json[name]['txt']) {
			await fetch("roms/" + json[name]['txt'])
				.then(res => res.text())
				.then(text => {
					console.log(text,name)
					dom.insertAdjacentHTML('beforeend',
					`
					<div class="card" style="margin: 50px">
					<div class="card-header">
						${name}
					</div>
					<div class="card-body">
						<h5 class="card-title">${name}</h5>
						<p class="card-text">${text}</p>
						<a href="/play.html?rom=${json[name].rom}&name=${name}&details=${json[name].txt}" class="btn btn-primary">Play!</a>
					</div>
					</div>
					`)
				})
		}
		else {
			dom.insertAdjacentHTML('beforeend',
					`
					<div class="card" style="margin: 50px">
					<div class="card-header">
						${name}
					</div>
					<div class="card-body">
						<h5 class="card-title">${name}</h5>
						<p class="card-text">No info! Give it a shot anyways</p>
						<a href="/play.html?rom=${json[name].rom}&name=${name}" class="btn btn-primary">Play!</a>
					</div>
					</div>
					`)
		}
		// await fetch('roms/')
		
	}
}
async function entry() {
	let roms = document.getElementById('roms');
	if (roms) {
		main("test_opcode.ch8")
		populate();
	}
	else {
		const params = new URLSearchParams(document.location.search);
		const rom = params.get("rom");
		const name = params.get("name");
		const details = params.get("details");
        console.log(rom);
		main(rom);
		let deets = document.getElementById('details');
		if (details) {
			await fetch("roms/" + details).then(res => res.text()).then(text => {
				deets.insertAdjacentHTML('beforeend',
				`
				<div>
					<h2>${name}</h2>
					<hr>
					<p>${text}</p>
				</div>
				`
				)
			})
		}
		else {
			deets.insertAdjacentHTML('beforeend',
				`
				<div>
					<h2>${name}</h2>
					<hr>
					<p>Info not found!</p>
				</div>
				`
				)
		}
			
		
	}
	
}
//document.querySelector('button').addEventListener('click', main('Tank.ch8'));

window.onload = entry;