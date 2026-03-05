const input = document.getElementById("term_btn");
const terminal = document.getElementById("term_body");

function focusEnd() {
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

function focusAndScroll() {
  focusEnd();
  scrollToBottom();
}

window.addEventListener("load", () => {
  focusAndScroll();
});

terminal.addEventListener("click", () => {
  focusAndScroll();
});

input.addEventListener("focus", focusAndScroll);
input.addEventListener("input", scrollToBottom); 


class TreeNode {
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }
}

const root = new TreeNode (
  "~",
  [ 
    new TreeNode ("About", 
      [
        new TreeNode("About"),
        new TreeNode("Goals"),
        new TreeNode("Interests"),
      ]
    ), 
    new TreeNode ("Experience", 
      [
        new TreeNode("IT Support Specialist - FSU"),
        new TreeNode("Research Assistant - FSU"),
        new TreeNode("Fullstack Developer - Scientiae"),
        new TreeNode("Stem Instructor - Scientiae"),
        new TreeNode("Software Engineering Intern - AIM HI")
      ]
    ), 
    new TreeNode ("Education", 
      [
        new TreeNode("Computer Science - Florida State University"), 
        new TreeNode("Philosophy mnr   - Florida State University") 
      ]
    ), 
    new TreeNode ("Projects", 
      [
        new TreeNode("Text Generation"),
        new TreeNode("Basic Utils"),
        new TreeNode("Meow Lang"),
        new TreeNode("Chessfml"), 
      ]
    ), 
  ]
);



// ================================= DIR ================================= //
function get_directory_contents (){
  
}
// ======================================================================= //

// ================================= GEN ================================= //
function create_term_response(text, before_div, parent_div){
  var resp_div = document.createElement("p");
  var resp_txt = document.createTextNode(text);
  resp_div.appendChild(resp_txt);
  resp_div.classList.add("text-gray-400");
  parent_div.insertBefore(resp_div, before_div)
}


function create_term_response_nt(text){
  parent_div = document.getElementById("term_body")
  before_div = document.getElementById("term_user_entry")
  create_term_response(text, before_div, parent_div)
}


function add_entered_command(text, parent, path_div, before_div) {
  const p = document.createElement("p");

  const userspan = document.createElement("span");
  userspan.className = "text-blue-400";
  userspan.textContent = "user@machine";

  const pathspan = document.createElement("span");
  pathspan.className = "text-purple-400";
  pathspan.textContent = path_div;

  const cmdspan = document.createElement("span");
  cmdspan.className = "text-grey-400";
  cmdspan.textContent = " " + text;

  p.appendChild(userspan);
  p.appendChild(document.createTextNode(":"));
  p.appendChild(pathspan);
  p.appendChild(document.createTextNode("$ "));
  p.appendChild(cmdspan);

  parent.insertBefore(p, before_div);
}

// ======================================================================= //


var term_btn = document.getElementById("term_btn");
var pwd = root;

function add_term_dir(element) {
  if (!element.children || element.children.length === 0) {
    create_term_response_nt(`FILE: ${element.value}`);
    return;
  }

  for (const child of element.children) {
    if (!child.children || child.children.length === 0) {
      create_term_response_nt(`FILE: ${child.value}`);
    } else {
      create_term_response_nt(`DIR: ${child.value}`);
    }
  }
}


function validate_path_helper(curr, tokens) {
  if (tokens.length === 0) {
    return curr;
  }


  for (const child of curr.children) {
    if (child.value.toLowerCase() === tokens[0].toLowerCase()) {
      return validate_path(child, tokens.slice(1));
    }
  }

  return null;
}

function validate_path(curr, tokens){
  if(tokens[0] === "~"){
    curr = root;
    tokens = tokens.slice(1);
  }

  return validate_path_helper(curr, tokens);
}


function handle_ls(tokens){
  // console.log(pwd.children.length) 
  //
  //todo handle pathing prints
  //
  if(tokens.length == 1){
    add_term_dir(pwd);
  }
  
  if(tokens.length >= 2){
    const path_toks = tokens[1].split("/")
    console.log(path_toks)

    const path_obj = validate_path(pwd, path_toks)

    if(path_obj == null){
      create_term_response_nt(`Path '${tokens[1]}' could not be found`);
      return
    }
    add_term_dir(path_obj)
  }

}

function handle_cd(tokens){
  if(tokens.length == 1){

  }

  if(tokens.length >= 2){
    // console.log("Tokens:", tokens.indexOf(1))
    console.log("Tokens:", tokens[1])
    const path_toks = tokens[1].split("/");
    const new_pwd = validate_path(pwd,path_toks)
    if(new_pwd == null){
      create_term_response_nt(`Path '${tokens[1]}' could not be found`);
      return
    }

    pwd = new_pwd;
  }
}

function add_term_prompt() {
  const p = document.createElement("p");
  p.id = "term_user_entry";
  
  const userSpan = document.createElement("span");
  userSpan.className = "text-blue-400";
  userSpan.textContent = "user@machine";
  
  const pathSpan = document.createElement("span");
  pathSpan.className = "text-purple-400";
  pathSpan.textContent = ":~";
  
  const dollarSign = document.createTextNode("$ ");
  
  const input = document.createElement("input");
  input.id = "term_btn";
  input.className = "border-0 focus:outline-none focus:ring-0 focus:border-transparent";
  
  p.appendChild(userSpan);
  p.appendChild(pathSpan);
  p.appendChild(dollarSign);
  p.appendChild(input);
  
  terminal.appendChild(p);
  
  input.focus();
  terminal.scrollTop = terminal.scrollHeight;
  
  return input;
}

function eval_term_entry(){
  term_entry = term_btn.value;
  term_btn.value = ""; 
  term_div = document.getElementById("term_body");
  term_user_entry = document.getElementById("term_user_entry");

  tokens = term_entry.split(" ");

  add_entered_command(term_entry, term_div,  pwd.value, term_user_entry);

  if(tokens.length == 0){

  }
  else if (tokens[0] == "ls"){
    handle_ls(tokens);  
  }
  else if (tokens[0] == "cd"){
    handle_cd(tokens);  
  }

  // fix-- broken input
  else if (tokens[0] == "clear"){
    term_div.innerText=""
    add_term_prompt()
  }
}

term_btn.addEventListener("keypress", function(event) {
  focusEnd();
  focusAndScroll();

  if(event.key == "Enter") {
    event.preventDefault();
    eval_term_entry();
  }
});

