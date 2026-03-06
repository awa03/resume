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

function make_job_html(title, dateRange, description, company) {
  const bullets = description
    .map(item => `<li class="mb-1">${item}</li>`)
    .join("");

  return `
    <div class="w-full p-4 bg-gray-800">
      <h1 class="text-2xl mb-4 text-green-200">${company}</h1>
        <div>
          <div class="w-full bg-gray-700 p-2 mb-4">
            <h2 class="text-l">${title}</h2>
            <p class="text-sm">${dateRange}</p> 
          </div>
          <ul class="text-gray-400 list-disc list-inside">
            ${bullets}
          </ul>
        </div>
    </div>
  `;
}

class TreeNode {
    constructor(value, type, children=null, content="") {
        this.value = value;
        this.children = children;
        this.type = type;
        this.content = content;
    }
}

const root = new TreeNode (
  "~", "DIR",
  [ 
    new TreeNode ("About", "DIR",
      [
        new TreeNode("About", "FILE", null, 
          `
          <div class="p-4 bg-gray-900">
            <h1 class="text-2xl pb-4">About Me</h1>
            <img class="h-80 w-full object-cover" src="./img/me.jpeg" />
            <p class="mt-4">
              Hey, Im Aiden! I am a passionate Computer Science graduate interested in operating systems development. 
            </p>
          </div>
          `
        ),
        new TreeNode("Goals", "FILE", null, 
          `
          `
        ),
        new TreeNode("Interests", "FILE", null,
          `

          `
        ),
      ]
    ), 
    new TreeNode ("Experience", "DIR",
      [
        new TreeNode("IT Support Specialist - FSU", "FILE", null, 
          make_job_html(
            "IT Support Specialist",
            "10/16/25 - Present",
            [
              "Provided technical support for 5,000+ campus devices.",
              "Managed endpoints using Active Directory, SCCM, Intune, and Entra ID.",
              "Developed PowerShell scripts to automate device backups and virtual image mounting.",
              "Resolved complex kernel-level issues impacting hundreds of devices.",
              "Configured Android and Linux environments within Intune for compliance."
            ],
            "Florida State University"
          )
        ),
        new TreeNode("Research Assistant - FSU", "FILE", null, 
          make_job_html(
            "Research Assistant",
            "12/10/24 - 04/10/25",
            [
              "Gathered data to train a model to recognize AI generated content",
              "Recruited over 20 participants for the study",
              "Participated in an international competition",
            ],
            "Florida State University"
          )
        ),
        new TreeNode("Fullstack Developer - Scientiae", "FILE", null,
          make_job_html(
            "Fullstack Developer",
            "10/20/24 - 08/01/25",
            [
              "Developed a website from scratch using HTML, Tailwindcss, Javascript, and Go",
              "Architected Postgres database for efficent database querys",
              "Created a custom form page akin to google forms",
              "Trained an AI model to answer company specific questions",
              "Implemented Dynamic features such as an email mailing list"
            ],
            "Scientiae"
          )
        ),
        new TreeNode("Stem Instructor - Scientiae", "FILE", null, 
          make_job_html(
            "Stem Instructor",
            "04/31/24 - 08/01/25",
            [
              "Instructed over 200 students in STEM and computer science topics.",
              "Delivered STEM courses across five schools throughout Leon County.",
              "Taught topics ranging from programming fundamentals to operating systems concepts."
            ],
            "Scientiae"
          )
        ),
        new TreeNode("Software Engineering Intern - AIM HI", "FILE", null, 
          make_job_html(
            "Software Engineering Intern",
            "07/01/24 - 10/31/24",
            [
              "Contributed to the development of AIM HI's website using React, improving user engagement and functionality.",
              "Played a key role in building AI image generation tools, and enhancing product features and performance.",
              "Attended strategy meetings, offering valuable insights to guide project direction and implementation.",
              "Directly communicated with potential customers, gathering feedback and aligning development with user needs."
            ],
            "Aim Hi"
          )
        )
      ]
    ), 
    new TreeNode ("Education", "DIR",  
      [
        new TreeNode("Computer Science - Florida State University", "FILE", null,
          make_job_html(
            "Florida State University",
            "05/01/22 - 08/01/25",
            [
              "2x ACM Programming Contest Question Writer",
              "Operating Systems",
              "Parallel and Procedural Programming",
              "Data Structures and Algorithms",
              "Discrete Math"
            ],
            "Major: Computer Science"
          )
        ), 
        new TreeNode("Philosophy mnr   - Florida State University", "FILE", null,
          make_job_html(
            "Florida State University",
            "05/01/22 - 08/01/25",
            [
              "Screening Science",
              "History of Philosophy",
              "Reasoning and Critical Thinking"
            ],
            "Minor: Philosophy"
          )
        ) 
      ]
    ), 
    new TreeNode ("Projects", "DIR",
      [
        new TreeNode("Text Generation", "FILE", null, 
          ""
        ),
        new TreeNode("Basic Utils", "FILE", null,
          ""
        ),
        new TreeNode("Meow Lang", "FILE", null,
          ""
        ),
        new TreeNode("Chessfml", "FILE", null,
          ""
        ), 
      ]
    ), 
  ]
);


function add_term_html_entry(contents){
  parent_div = document.getElementById("term_body")
  before_div = document.getElementById("term_user_entry")

  var resp_div = document.createElement("div");
  resp_div.innerHTML = contents
  parent_div.insertBefore(resp_div, before_div)
}

// ================================= DIR ================================= //
// ======================================================================= //

// ================================= GEN ================================= //
function add_term_response(text, before_div, parent_div){
  var resp_div = document.createElement("p");
  var resp_txt = document.createTextNode(text);
  resp_div.appendChild(resp_txt);
  resp_div.classList.add("text-gray-400");
  parent_div.insertBefore(resp_div, before_div)
}


function add_term_response_nt(text){
  parent_div = document.getElementById("term_body")
  before_div = document.getElementById("term_user_entry")
  add_term_response(text, before_div, parent_div)
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
    add_term_response_nt(`${child.type}: ${element.value}`);
    return;
  }

  for (const child of element.children) {
    add_term_response_nt(`${child.type}: ${child.value}`);
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

  if(tokens[0] === ""){
    curr = pwd;
    tokens = tokens.slice(1);
  }

  return validate_path_helper(curr, tokens);
}


function handle_ls(tokens){
  // console.log(pwd.children.length) 
  //
  //todo handle pathing prints
 
  
  // if just ls
  if(tokens.length == 1){
    add_term_dir(pwd);
  }
  
  // if path provided
  if(tokens.length >= 2){
    const path_toks = tokens[1].split("/")
    console.log(path_toks)

    const path_obj = validate_path(pwd, path_toks)

    if(path_obj == null){
      add_term_response_nt(`Path '${tokens[1]}' could not be found`);
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
      add_term_response_nt(`Path '${tokens[1]}' could not be found`);
      return
    }

    if(new_pwd.type == "FILE"){
      add_term_response_nt(`Path '${tokens[1]}' is a file`);
      return
    }

    pwd = new_pwd;
  }
}

function handle_cat(tokens){
  console.log("Cat", tokens)
  if(tokens.length == 1){
    add_term_response_nt(`No File Input provided - Try using TAB for autocomplete`);
  }
  if(tokens.length == 2){

    if(tokens[1] == ""){
      add_term_response_nt(`No File Input provided - Try using TAB for autocomplete`);
      return
    }

    else if(tokens[1] == "-a"){
      console.log("pwd children", pwd.children)
      for (const child of pwd.children) {
        add_term_html_entry(child.content); 
      }
      return;
    }

    const path_toks = tokens[1].split("/");
    const curr = validate_path(pwd, path_toks);

    if(curr == null){
      add_term_response_nt(`Path '${tokens[1]}' could not be found`);
      return
    }
    else if(curr.type == "DIR"){
      add_term_response_nt(`Path '${tokens[1]}' is a directory`);
      return
    }

    add_term_html_entry(curr.content);
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

function update_pwd(){
    term_pwd.innerHTML = pwd.value
}

function eval_term_entry(){
  term_entry = term_btn.value;
  term_btn.value = ""; 
  term_div = document.getElementById("term_body");
  term_user_entry = document.getElementById("term_user_entry");

  /* Split -- "ls this is/the path"
   * Split 1 : [ls, this is/the, path]
   * Split 2 : [ls, this is/the path]
   *
   * Seperates command and path
   *
   * FIX
   * */
  tokens = [
      term_entry.split(" ")[0],
      term_entry.split(" ").slice(1).join(" ") 
  ]
  

  add_entered_command(term_entry, term_div,  pwd.value, term_user_entry);

  if(tokens.length == 0){

  }
  else if (tokens[0] == "ls"){
    handle_ls(tokens);  
  }
  else if (tokens[0] == "cd"){
    handle_cd(tokens);  
  }
  else if (tokens[0] == "cat"){
    handle_cat(tokens);  
  }

  // else if(tokens[0] == "pwd"){
  //    
  // }
  //
  // else if(tokens[0] == "help"){
  //    
  // }

  // fix-- broken input
  else if (tokens[0] == "clear"){
    term_div.innerText=""
    add_term_prompt()
  }

  else{
    add_term_response_nt(`Command '${tokens[0]}' could not be found`);
  }

  update_pwd();
}

term_btn.addEventListener("keypress", function(event) {
  focusEnd();
  focusAndScroll();

  if(event.key == "Enter") {
    event.preventDefault();
    eval_term_entry();
  }
});

function start(){
  update_pwd()
}

start();
