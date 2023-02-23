import './paint-filter.css';

export const PaintFilter = ({ filter, string }) => {
    if (!filter) return string;
    const regexp = new RegExp(filter, 'gi');
    const matchValue = string.match(regexp);

    if (matchValue) {
        string.replace(regexp, "<span className='paint-filter'>{firstMatch}</span>");
    }

    return string;
};
