const fs = require('fs');
const file = 'app/[locale]/our-team/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace stagger logic
content = content.replace(
  'transition={{ duration: 0.6, delay: idx * 0.1 }}',
  'transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}'
);

// Add state for image loading to the component?
// Since it's a map loop, we can just use the DOM `onLoad` to strip an opacity class.
content = content.replace(
  /className={\`object-cover transition-all duration-\[800ms\] ease-out group-hover:scale-110 \$\{member\.hoverImage \? 'group-hover:opacity-0' : ''\}\`}/g,
  `className={\`object-cover transition-all duration-[800ms] ease-out group-hover:scale-110 \${member.hoverImage ? 'group-hover:opacity-0' : ''} opacity-0\`}\n                      onLoad={(e) => (e.target as HTMLImageElement).classList.remove('opacity-0')}`
);

fs.writeFileSync(file, content);
