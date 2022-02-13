import './App.css';
import {useState, useRef, useEffect} from 'react';

function App({color}) {
	const [num, setNum] = useState(parseInt(window.location.hash.slice(1)) || 5);
	const appRef = useRef();
	const canvasRef = useRef();

	const onKeyDown = e => {
		const n = parseInt(e.key);
		if (!isNaN(n))
			setNum(n);
	};

	document.title = `${num} × ${num} = ${num * num}`;
	if (canvasRef.current) {
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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

	useEffect(() => {
		setInterval(() => {
			const n = parseInt(window.location.hash.slice(1));
			if (!isNaN(n) && n !== num) {
				setNum(n);
			}
		}, 200);
	}, []);

	useEffect(() => {
		window.location.hash = `#${num}`;
	}, [num]);
	return (
		<div
			className='App'
			ref={appRef}
			tabIndex={0}
			style={{backgroundColor: color}}
			onKeyDown={onKeyDown}
			onBlur={e => e.target.focus()}
		>
			<div className='sentence'>{num} fois {num}, ça fait {num * num}.</div>
			<canvas style={{display: 'none'}} width={128} height={128} ref={canvasRef} />
		</div>
	);
}

export default App;
