pub struct Stack<T> {
    container: Vec<T>,
}

impl<T> Stack<T> {
    pub fn new() -> Stack<T> {
        Stack {
            container: Vec::new(),
        }
    }

    pub fn push(&mut self, val: T) {
        self.container.push(val);
    }

    pub fn pop(&mut self) -> Option<T> {
        self.container.pop()
    }
    pub fn top(&self) -> Option<&T> {
        let ind: usize = self.container.len() - 1;
        self.container.get(ind)
    }

    pub fn is_empty(&self) -> bool {
        self.container.len() == 0
    }
}
