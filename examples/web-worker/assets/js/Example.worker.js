// // block for `time` ms, then return the number of loops we could run in that time:
export function expensive(time) {
	let start = Date.now(),
		  count = 0
	while (Date.now() - start < time) count++
	return count
}

export function hello(msg) {
	console.log('worker got message', msg)
	return { hello: 'from worker' }
}
