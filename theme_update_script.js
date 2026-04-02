const fs = require('fs');

let file = 'resources/js/Pages/Welcome.vue';
let content = fs.readFileSync(file, 'utf8');

// Replace backgrounds
content = content.replace(/bg-slate-50/g, 'bg-[#EDE4DC]');
content = content.replace(/bg-slate-100/g, 'bg-[#EDE4DC]/90');

// In CSS section
content = content.replace(/#14b8a6/g, '#7B6FA0');
content = content.replace(/#06b6d4/g, '#A5C8CB');

const replacements = [
    // Primary
    { match: /teal-500/g, replace: '[#7B6FA0]' },
    { match: /teal-400/g, replace: '[#7B6FA0]/90' },
    { match: /teal-600/g, replace: '#7B6FA0' },
    { match: /teal-700/g, replace: '[#7B6FA0]' },
    { match: /teal-50/g, replace: '[#7B6FA0]/10' },
    { match: /teal-300/g, replace: '[#7B6FA0]/80' },
    // Secondary
    { match: /cyan-500/g, replace: '[#A5C8CB]' },
    { match: /cyan-400/g, replace: '[#A5C8CB]/90' },
    { match: /cyan-600/g, replace: '#A5C8CB' },
    { match: /cyan-50/g, replace: '[#A5C8CB]/10' },
    { match: /cyan-300/g, replace: '[#A5C8CB]/80' },
    // Highlights
    { match: /rose-500/g, replace: '[#BFA4C8]' },
    { match: /rose-400/g, replace: '[#BFA4C8]/90' },
    { match: /rose-600/g, replace: '#BFA4C8' },
    { match: /rose-50/g, replace: '[#BFA4C8]/10' },
    { match: /rose-300/g, replace: '[#BFA4C8]/80' },
    { match: /amber-400/g, replace: '[#BFA4C8]' },
    { match: /emerald-500/g, replace: '[#A5C8CB]' },
    { match: /emerald-400/g, replace: '[#A5C8CB]/90' },
];

replacements.forEach(r => {
    content = content.replace(r.match, r.replace);
});

fs.writeFileSync(file, content);
console.log('Colors replaced successfully!');
