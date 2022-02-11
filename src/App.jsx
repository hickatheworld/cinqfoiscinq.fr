import './App.css';
import {useState, useRef} from 'react';

function App({color}) {
	const [num, setNum] = useState(5);
	const appRef = useRef();
	const canvasRef = useRef();
	const sentenceRef = useRef();

	const onKeyDown = e => {
		const n = parseInt(e.key);
		if (!isNaN(n) && n !== num) {
			sentenceRef.current.classList.add('transition');
			setTimeout(() => setNum(n), 150);
		}
	};

	document.title = `${num} × ${num} = ${num * num}`;
	if (canvasRef.current) {
		const ctx = canvasRef.current.getContext('2d');
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(64, 64, 64, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.font = '64pt Lovelo';
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.textBaseLine = 'middle';
		ctx.fillText(`${num * num}`, 64, 96);
		const base64 = canvasRef.current.toDataURL('image/png').split(',')[1];
		const link = document.querySelector('link[rel="icon"]');
		link.href = `data:image/png;base64,${base64}`;
	}

	if (appRef.current)
		appRef.current.focus();

	if (sentenceRef.current) {
		setTimeout(() => sentenceRef.current.classList.remove('transition'), 150);
	}

	return (
		<div
			className='App'
			ref={appRef}
			tabIndex={0}
			style={{backgroundColor: color}}
			onKeyDown={onKeyDown}
			onBlur={e => e.target.focus()}
		>
			<div className='sentence' ref={sentenceRef}>{num} fois {num}, ça fait {num * num}.</div>
			<canvas style={{display: 'none'}} width={128} height={128} ref={canvasRef} />
		</div>
	);
}

export default App;
