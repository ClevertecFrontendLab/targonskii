import { useSelector } from 'react-redux';

export const useCategoryByName = (cat) => {
    const categories = useSelector((state) => state.categories.categories);
    let category = '';

    categories.forEach((i) => {
        if (i.name.includes(cat)) {
            category += i.path;
        }
    });

    return category;
};
