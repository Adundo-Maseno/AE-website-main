const fs = require('fs');
const file = 'components/motion/preloader.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add states
content = content.replace(
  'const [startAnimation, setStartAnimation] = useState(false);',
  `const [startAnimation, setStartAnimation] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // When both the internal background and the page video are ready, begin animation
  useEffect(() => {
    if (bgLoaded && videoReady) {
      setStartAnimation(true);
    }
  }, [bgLoaded, videoReady]);

  // Safety fallback if something hangs
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);`
);

// Modify video ready logic
content = content.replace(
  /useEffect\(\(\) => \{\n    let resolved = false;[\s\S]*?\}, \[\]\);/,
  `useEffect(() => {
    let resolved = false;
    const resolve = () => {
      if (resolved) return;
      resolved = true;
      setVideoReady(true);
    };

    if ((window as any).__heroVideoReady) {
      resolve();
      return;
    }

    window.addEventListener('hero-video-ready', resolve);

    const checkTimer = setTimeout(() => {
      const video = document.querySelector('video');
      const isDesktop = window.innerWidth >= 768;
      if (!video || !isDesktop) {
        resolve();
      }
    }, 50);

    const maxTimer = setTimeout(resolve, 8000);

    return () => {
      window.removeEventListener('hero-video-ready', resolve);
      clearTimeout(checkTimer);
      clearTimeout(maxTimer);
    };
  }, []);`
);

// Add onLoad to the images
content = content.replace(
  /className="object-cover"\n\s*priority fetchPriority="high"/g,
  `className="object-cover"
                priority fetchPriority="high"
                onLoad={() => setBgLoaded(true)}`
);

fs.writeFileSync(file, content);
