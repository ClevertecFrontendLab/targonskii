import { useSelector } from 'react-redux';

export const useCategoryByPath = (cat) => {
    const categories = useSelector((state) => state.categories.categories);
    let category = '';

    categories.forEach((i) => {
        if (i.path.includes(cat)) {
            category += i.name;
        }
    });

    return category;
};