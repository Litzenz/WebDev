export const FOOD = [
    '🥘', '🍲', '🥣', '🥓', '🥐', '🍕', '🍗', '🍙', '🍱', '🍪',
    '🍌', '🥥', '🥨', '🌯', '🍜', '🍥', '🍨', '🍷', '🍺', '🥂',
    '🍦', '🥡', '🥟', '🍡', '🥮', '🍣', '🍚', '🍛', '🥙', '🥪'
];

function hashWord(word) {
    let hash = 0, i, chr;
    for (i = 0; i < word.length; i++) {
        chr = word.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function wordToFood(word) {
    if (!word) return '';
    return FOOD[Math.abs(hashWord(word)) % FOOD.length];
}