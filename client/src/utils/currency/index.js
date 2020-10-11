export default ({ amount, decimals, culture = 'es-AR' }) => {
	if (!amount) return;

	const number = Number(`${amount}.${decimals ?? 0}`);

	return number.toLocaleString(culture, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};
