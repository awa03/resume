/*
 * Thought process: 
 * translate the guess into a number, and approximate the entered based on difference
 * may need normalize function for this, seeing as cat and zat may confuse for other commands
 * */

const input = document.getElementById("term_btn");
var term_btn = document.getElementById("term_btn");
var suggestion_txt = document.getElementById("ghost");

class HashPair {
    constructor(value, hash) {
        this.value = value;
        this.hash = hash;
    }
}

var suggestions = [];

function update_suggestion_list(entry) {
  suggestions.push(new HashPair(entry, hash_str(entry)));
}

function update_displayed_suggestion() {
  console.log("Suggesting", get_suggestion());
  suggestion_txt.innerText = get_suggestion() ?? "";  
}

function get_suggestion() {
  var curr_entry = term_btn.value;
  if (!curr_entry || curr_entry.length === 0) return null;

  for (var suggestion of suggestions) {
    if (suggestion.value.startsWith(curr_entry)) {
      return suggestion.value;
    }
  }

  var threshold = 1;
  var curr_best = null;
  for (var suggestion of suggestions) {
    if (fuzzy_mtch(curr_entry, suggestion.value, threshold)) {
      if (curr_best === null || suggestion.value.length < curr_best.length) {
        curr_best = suggestion.value;
      }
    }
  }

  return curr_best;
}
function replace_suggest_text() {              
  var suggestion = get_suggestion();
  if (suggestion) {
    term_btn.value = suggestion;
    suggestion_txt.innerText = "";
  }
}

function clear_suggestion() {                  
  suggestion_txt.innerText = "";
}

input.addEventListener("input", update_displayed_suggestion);

term_btn.addEventListener("keydown", function(event) {
  if (event.key == "Tab") {
    event.preventDefault();
    replace_suggest_text();
  }
  if (event.key == "Enter") {
    event.preventDefault();
    clear_suggestion();
    update_suggestion_list(term_btn.value);
  }
});

function fuzzy_mtch(a, b, threshold = 2000) {
  return hash_help(a, threshold) === hash_help(b, threshold);  
}

function hash_help(string, threshold = 2, buckets = 10000019) {
  // default case
  if (!string || string.length === 0) return 0;


  const s = string.toLowerCase();
  const step = threshold + 1;
  let fingerprint = 0;

  
  for (let i = 0; i < s.length - 1; i++) {
    // collapse & spread nums
    const bigram = s.charCodeAt(i) * 31 + s.charCodeAt(i + 1);

    fingerprint = (fingerprint + bigram * (i + 1)) >>> 0;
  }
  for (let i = 0; i < s.length; i += step) {
    fingerprint = (fingerprint ^ (s.charCodeAt(i) * 2654435761 >>> 0)) >>> 0;
  }

  const lengthBand = Math.floor(s.length / (threshold + 1));
  fingerprint = (fingerprint + lengthBand * 1000003) >>> 0;
  return fingerprint % buckets;
}

function hash_str(string) {
  if (!string || string.length === 0) return 0;
  var total = 0;
  for (var i = 0; i < string.length; i++) {
    total += hash_c(string.charAt(i));
  }
  return total % 10000019;
}

// newth multiplicative hash 
// https://encode.su/threads/62-Knuth-s-Multiplicative-Hashing
// https://lowrey.me/exploring-knuths-multiplicative-hash-2/
//
// spread the characters apart so groups wont sum to the the same value
function hash_c(char) {
  return char.charCodeAt(0) * 2654435761 >>> 0;
}

update_suggestion_list("cat");
update_suggestion_list("cat -a");
update_suggestion_list("cat -h");
update_suggestion_list("ls");
update_suggestion_list("ls -h");
update_suggestion_list("ls about");
update_suggestion_list("ls experience");
update_suggestion_list("ls education");
update_suggestion_list("ls projects");
update_suggestion_list("cd");
update_suggestion_list("cd ~");
update_suggestion_list("cd -h");
update_suggestion_list("cd about");
update_suggestion_list("cd experience");
update_suggestion_list("cd education");
update_suggestion_list("cd projects");
update_suggestion_list("clear");
update_suggestion_list("clear -h");
update_suggestion_list("touch")
update_suggestion_list("touch -h")
