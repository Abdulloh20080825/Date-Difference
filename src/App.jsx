import React, { useState, useEffect } from 'react';

const App = () => {
	const [select, setSelect] = useState('from now');
	const [date, setDate] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [result, setResult] = useState('');
	const [currentTime, setCurrentTime] = useState(new Date());

	const fromNow = () => {
		if (!date) return 'Please select a date.';
		const inputDate = new Date(date);
		const difference = Math.floor(
			(currentTime - inputDate) / (1000 * 60 * 60 * 24)
		);
		return difference;
	};

	const calculateDifference = () => {
		if (!startDate || !endDate) return 'Please select both dates.';
		const start = new Date(startDate);
		const end = new Date(endDate);
		const difference = Math.floor((end - start) / (1000 * 60 * 60 * 24));
		return difference;
	};

	const chooseYourTime = () => {
		return `Difference between selected dates: ${calculateDifference()} days.`;
	};

	const handleCalculateClick = () => {
		if (select === 'Choose your time') {
			setResult(chooseYourTime());
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (select === 'from now') {
			setResult('');
		}
	}, [select]);

	return (
		<div className='relative min-h-screen bg-gray-900 text-white'>
			<div className='absolute inset-0 z-[-1] bg-gradient-to-br from-gray-800 via-purple-600 to-blue-500'></div>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-2xl sm:text-3xl font-extrabold text-center mt-8 mb-2'>
					Find how many days are left or have passed since a particular moment
					or from now :)
				</h1>
				<div className='absolute top-0 right-0 p-3 sm:p-5'>
					<div className='backdrop-filter backdrop-blur-sm bg-black bg-opacity-50 p-2 sm:p-4 rounded-lg shadow-lg'>
						<p className='text-center text-sm sm:text-lg mb-4 sm:mb-8 font-mono text-white font-extrabold'>
							Now {currentTime.getFullYear()}
							{'/'}
							{currentTime.getMonth() < 9
								? `0${currentTime.getMonth() + 1}`
								: currentTime.getMonth() + 1}
							{'/'}
							{currentTime.getDate() < 10
								? `0${currentTime.getDate()}`
								: currentTime.getDate()}{' '}
							{currentTime.getHours() < 10
								? `0${currentTime.getHours()}`
								: currentTime.getHours()}
							:
							{currentTime.getMinutes() < 10
								? `0${currentTime.getMinutes()}`
								: currentTime.getMinutes()}
							:
							{currentTime.getSeconds() < 10
								? `0${currentTime.getSeconds()}`
								: currentTime.getSeconds()}
						</p>
					</div>
				</div>

				<div className='flex justify-center mb-8'>
					<select
						name='select'
						value={select}
						onChange={(e) => setSelect(e.target.value)}
						className='p-2 sm:p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400'
					>
						<option value='from now'>From Now</option>
						<option value='Choose your time'>Choose your time</option>
					</select>
				</div>
				<div className='flex flex-col items-center'>
					{select === 'from now' ? (
						<div className='w-full max-w-xs sm:max-w-md'>
							<input
								type='date'
								placeholder='Enter a date'
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className='w-full p-2 sm:p-3 border border-gray-700 rounded-lg bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400'
							/>
							<p className='text-center text-sm sm:text-lg'>
								{fromNow() > 0
									? `Days have passed: ${fromNow()}`
									: `Days left: ${fromNow() * -1}`}
							</p>
						</div>
					) : (
						<div className='w-full max-w-xs sm:max-w-md'>
							<div className='mb-4'>
								<h2 className='text-lg sm:text-xl font-semibold mb-2'>From</h2>
								<input
									type='date'
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									className='w-full p-2 sm:p-3 border border-gray-700 rounded-lg bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400'
								/>
							</div>
							<div className='mb-4'>
								<h2 className='text-lg sm:text-xl font-semibold mb-2'>To</h2>
								<input
									type='date'
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className='w-full p-2 sm:p-3 border border-gray-700 rounded-lg bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400'
								/>
							</div>
							<button
								onClick={handleCalculateClick}
								className='p-2 sm:p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400'
							>
								Calculate
							</button>
							<p className='text-center text-sm sm:text-lg mt-4'>{result}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
