const input = document.getElementById("term_btn");
const terminal = document.getElementById("term_body");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}   



        // <div class="w-full p-2 mb-4">
        //   <img class="w-150 h-150" src="${img}" /> </div>
function make_project_html(title, img, description, link) {
  const bullets = description
    .map(item => `<li class="mb-1">${item}</li>`)
    .join("");

    return `
    <a href="${link}" target="_blank">
      <div class="w-full p-4 bg-gray-800 hover:bg-[#273549] rounded-xl">
        <h1 class="text-2xl mb-4 text-green-200">${title}</h1>
        <ul class="text-gray-400 list-disc list-inside">
          ${bullets}
        </ul>
      </div>
    </a>
    `;
}

function make_job_html(title, dateRange, description, company) {
  const bullets = description
    .map(item => `<li class="mb-1">${item}</li>`)
    .join("");

  return `
    <div class="w-full p-4 bg-gray-800 rounded-xl">
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
    new TreeNode ("about", "DIR",
      [
        new TreeNode("about", "FILE", null, 
          `
          <div class="p-4 bg-gray-900 rounded-xl">
            <h1 class="text-2xl pb-4">About Me</h1>
            <img class="h-80 w-full object-cover" src="./img/me.jpeg" />
            <p class="mt-4">
              Hi, I’m Aiden! <span class="text-gray-400"> I’m a passionate Computer Science graduate with a deep curiosity for how computers work at every level. I was born in Tampa, Florida, and have always been fascinated by technology and the systems that power the digital world. My primary interest lies in operating systems development, where I enjoy exploring low-level programming, system architecture, and the interaction between hardware and software. I’m particularly drawn to understanding how operating systems manage resources, handle processes, and provide the foundation that modern applications rely on.
              Beyond operating systems, I enjoy learning about different areas of computing and continually expanding my knowledge of software, programming, and system design. I’m always excited to take on new challenges, build meaningful projects, and deepen my understanding of the technology that shapes our everyday lives.
              </span>
            </p>
          </div>
          `
        ),
        new TreeNode("goals", "FILE", null, 
          `
            
          `
        ),
        new TreeNode("interests", "FILE", null,
          `
          <div class="p-4 bg-gray-900 rounded-xl">
            <h1 class="text-2xl pb-4">Intrests</h1>
            <h3 class="text-xl pb-4 border-b-4">Technical</h3>
            <ul class="list-disc p-4 text-grey-400">
              <li>Operating Systems Development</li>
              <li>Systems Programming</li>
              <li>Low-Level Programming (C, C++, Rust)</li>
              <li>Computer Architecture</li>
              <li>Kernel Development</li>
              <li>Memory Management</li>
              <li>Process Scheduling and Concurrency</li>
              <li>Distributed Systems</li>
              <li>Embedded Systems</li>
              <li>Networking and Network Protocols</li>
              <li>File Systems</li>
              <li>Virtualization and Containers</li>
              <li>Compilers and Programming Languages</li>
              <li>Performance Optimization</li>
              <li>Debugging and Reverse Engineering</li>
              <li>Open Source Development</li>
            </ul>
            
            <h3 class="text-xl pb-4 mt-6 border-b-4">Personal</h3>
            <ul class="list-disc p-4 text-grey-400">
              <li>Philosophy</li>
              <li>Psychology</li>
              <li>Perfumery</li>
              <li>Powerlifting</li>
              <li>Body Building</li>
              <li>Music Mixing</li>
            </ul>

          </div>
          `
        ),
      ]
    ), 
    new TreeNode ("experience", "DIR",
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
    new TreeNode ("education", "DIR",  
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
    new TreeNode ("projects", "DIR",
      [
        new TreeNode("Text Generation", "FILE", null, 
          make_project_html(
            "Text Generation",
            "./img/text-gen.png",
            [
              "Created a byte pair encoding algorithm capable of reducing file size by 50%",
              "Within bpe file read translation table to decode symbols",
              "Created a probability chain, markov chain, using symbol occurances",
              "Using the generated probabilities generated and completed sentences based on training data"
            ],
            "https://github.com/awa03/text-completion"
          )
        ),
        new TreeNode("Basic Utils", "FILE", null,
          make_project_html(
            "Basic Utils",
            "./img/basic-utils.jpeg",
            [
              "A set of helpful tools for your linux terminal",
              "trsh - a trashcan for your linux terminal",
              "file joining - merge files together", 
              "logger - logging tool",
            ],
            "https://github.com/awa03/basic-utils"
          )
        ),
        new TreeNode("Meow Lang", "FILE", null,
          make_project_html(
            "Meow Lang",
            "",
            [
              "An in development programming language",
              "Features arithmetic parsing through AST generation",
              "Implemented variable storage",
              "Mutable and Unmutable data types", 
              "Dynamic typing"
            ],
            "https://github.com/awa03/meowlang"
          )
        ),
        new TreeNode("Chessfml", "FILE", null,
          make_project_html(
            "Chessfml",
            "",
            [
              "Developed a fully functional chess game in C++ using SFML",
              "Applied Object oriented principles in order to ensure scalability and design",
              "Developed using the C++ language to ensure portability across multiple platforms"
            ]
          )
        ), 
      ]
    ), 
  ]
);

const help_flags = new Map([
  ["help", "this command provides an interactive demonstration of some the commands within this terminal emulator!"],
  ["cd", "use this command to change your working directory. You can also specify a more complex path if you would like!"],
  ["ls", "use this command to see the contents of your current directory, or if you add a path you can see that paths contents!"],
  ["cat", "use this command, followed by the path a file, to view its contents! You can also use -a to see all the files in your current directories contents."],
  ["clear", "use this command to clear the terminal!"],
  ["touch", "use this command to create new files!"],
  // ["mkdir", "use this command to make new directories!"]  // TODO
])


function add_term_html_entry(contents){
  var parent_div = document.getElementById("term_body")
  var before_div = document.getElementById("term_user_entry")

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
  var parent_div = document.getElementById("term_body")
  var before_div = document.getElementById("term_user_entry")
  add_term_response(text, before_div, parent_div)
}

function add_term_response_nt_type_writer(text, wait){
  var resp_div = document.createElement("div");
  resp_div.classList = "text-gray-400"
  var parent_div = document.getElementById("term_body")
  var before_div = document.getElementById("term_user_entry")
  var i =0;
  parent_div.insertBefore(resp_div, before_div)


  function type_writer() {
    if(i < text.length){
      resp_div.innerHTML += text.charAt(i);
      setTimeout(type_writer, wait);
      i++;
    }
  }

  type_writer();
}


function add_entered_command_nt(txt){
  var term_div = document.getElementById("term_body");
  var term_user_entry = document.getElementById("term_user_entry");

  add_entered_command(txt, term_div,  pwd.value, term_user_entry);
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

function handle_clear(){    
  if(terminal){
    Array.from(terminal.children).forEach(child => {
      if(child.id !== "term_user_entry"){
        child.remove();
      }
    })
  }
}


function handle_touch(tokens){
  if(tokens.length == 1){
  }

  if(tokens.length >= 2){
    // console.log("Tokens:", tokens.indexOf(1))
    console.log("Tokens:", tokens[1])
    const path_toks = tokens[1].split("/");
    const new_file = path_toks.pop();
    const file_dir = validate_path(pwd, path_toks)

    file_dir.children.push(new TreeNode(new_file, "FILE", null,"Why cat your empty file??"));
  }
}

function handle_echo(tokens){
  add_term_response_nt(tokens[1])
}

async function type_write_w_sleep(text, gap_char, padding){
  add_term_response_nt_type_writer(text, gap_char)
  await sleep((text.length * gap_char) + padding)
}


async function handle_help(tokens){
  var gap_char = 65
  var padding = 500

  await type_write_w_sleep("Thanks for checking out my resume!", gap_char, padding)
  await type_write_w_sleep("Use commands to navigate the 'file' system to learn more information about me!", gap_char, padding)
  await type_write_w_sleep("Use 'ls' to view contents of directory", gap_char, padding)
  await type_write_w_sleep("Heres is your current directories contents", gap_char, padding)

  add_entered_command_nt("ls");
  handle_ls(["ls"])

  await sleep(1000)
  await type_write_w_sleep("Now lets try moving to the about directory", gap_char, padding)

  add_entered_command_nt("cd about");
  handle_cd(["cd", "about"])

  add_entered_command_nt("ls");
  handle_ls(["ls"])

  await sleep(1000)
  await type_write_w_sleep("As you can see the contents are different!", gap_char, padding)

  await type_write_w_sleep("To read the contents of one of the listed files", gap_char, 0)
  await type_write_w_sleep("you can use the cat command...", gap_char, 1000)

  add_entered_command_nt("cat about")
  handle_cat(["cat", "about"])

  await type_write_w_sleep("Woah thats me! Lets return to the root now", gap_char, padding)
  await type_write_w_sleep("To return to the root directory we use `cd ~`", gap_char, padding)
  add_entered_command_nt("cd ~")
  handle_cd(["cd", "~"])

  await sleep(1000)
  await type_write_w_sleep("Now if we list the contents again...", gap_char, padding)
  add_entered_command_nt("ls");
  add_term_dir(root)
  await sleep(1000)

  await type_write_w_sleep("We are right back where we started!", gap_char, padding)
  await type_write_w_sleep("Thats All! Try using -h flag after command if you need more help!", gap_char, padding)
  await type_write_w_sleep("Thanks again for checking out the resume!", gap_char, padding)
  
}

function handle_help_flag(command){
  add_term_response_nt(help_flags.get(command));
}


function update_pwd(){
    term_pwd.innerHTML = pwd.value
}

async function eval_term_entry(){
  var term_entry = term_btn.value;
  term_btn.value = ""; 
  var term_div = document.getElementById("term_body");
  var term_user_entry = document.getElementById("term_user_entry");

  /* Split -- "ls this is/the path"
   * Split 1 : [ls, this is/the, path]
   * Split 2 : [ls, this is/the path]
   *
   * Seperates command and path
   *
   * FIX
   * */
  var tokens = [
      term_entry.split(" ")[0],
      term_entry.split(" ").slice(1).join(" ") 
  ]
  

  add_entered_command(term_entry, term_div,  pwd.value, term_user_entry);

  if(tokens.length == 2) {
    if(tokens[1] == "-h"){
      handle_help_flag(tokens[0]);
      return;
    }
  }

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
  else if(tokens[0] == "touch"){
    handle_touch(tokens)
  }

  // else if(tokens[0] == "pwd"){
  //    
  // }
  //
  else if(tokens[0] == "help"){
    await handle_help(tokens); 
  }

  // fix-- broken input
  else if (tokens[0] == "clear"){
    handle_clear(tokens);
  }

  else if(tokens[0] == "echo"){
    handle_echo(tokens)
  }

  else{
    add_term_response_nt(`Command '${tokens[0]}' could not be found`);
  }

  update_pwd();
}

term_btn.addEventListener("keydown", function(event) {
  if(event.key == "Enter") {
    event.preventDefault();
    eval_term_entry();
  }
});
function start(){
  update_pwd()
}


start();
