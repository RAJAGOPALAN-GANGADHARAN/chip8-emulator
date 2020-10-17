## 📚 About

Chip8 Emulator written in Rust. Bridge Ui to javascript with wasm bindings.

### 🛠️ Build with `wasm-pack build`

+ You should be using wasm-unknown-unknown target using: `rustup add target wasm-unknown-unknown`

```
wasm-pack build
cd server & npm run start
```

### 🔬 Test in Headless Browsers with `wasm-pack test`

```
wasm-pack test --headless --firefox
```

### 📒 Notes

+ Highly thread safe -  No unsafe code used
+ Made using shared memory technique to reduce overheads to and from javascript.

