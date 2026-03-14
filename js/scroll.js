var terminal = document.getElementById("term_body");
const termWindow = document.getElementById("term_window");
const termHeader = document.getElementById("term_header");
let offsetX = 0;
let offsetY = 0;
let dragging = false;

termHeader.addEventListener("mousedown", (e) => {
  dragging = true;
  offsetX = e.clientX - termWindow.offsetLeft;
  offsetY = e.clientY - termWindow.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  termWindow.style.left = e.clientX - offsetX + "px";
  termWindow.style.top = e.clientY - offsetY + "px";
});

document.addEventListener("mouseup", () => {
  dragging = false;
});

let userScrolledUp = false;
const SCROLL_THRESHOLD = 8;

terminal.addEventListener("scroll", () => {
  const distanceFromBottom = terminal.scrollHeight - terminal.scrollTop - terminal.clientHeight;
  userScrolledUp = distanceFromBottom > SCROLL_THRESHOLD;
});

function focusEnd() {
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

function scrollToBottomIfNeeded() {
  if (!userScrolledUp) scrollToBottom();
}

function focusAndScroll() {
  focusEnd();
  scrollToBottom();
}

const resizeObserver = new ResizeObserver(() => {
  scrollToBottomIfNeeded();
});
resizeObserver.observe(terminal);

const mutationObserver = new MutationObserver(() => {
  scrollToBottomIfNeeded();
});
mutationObserver.observe(terminal, { childList: true, subtree: true, characterData: true });

window.addEventListener("load", () => {
  focusAndScroll();
});

terminal.addEventListener("click", () => {
  focusEnd();
});

input.addEventListener("input", scrollToBottomIfNeeded);
