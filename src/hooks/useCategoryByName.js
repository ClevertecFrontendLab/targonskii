import { useSelector } from 'react-redux';

// export const useCategoryByName = (cat) => {
//     const categories = useSelector((state) => state.categories.categories);
//     let category = '';

//     categories.forEach((i) => {
//         if (i.name.includes(cat)) {
//             category += i.path;
//         }
//     });

//     return category;
// };
export const useCategoryByName = () => {
    const categories = useSelector((state) => state.categories.categories);

    return categories.reduce((result, category) => {
        result[category.path] = category.name;

        return result;
    }, {});
};