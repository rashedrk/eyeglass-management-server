import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query };

        // Filtering
        const excludeFields = ['searchTerm', 'minPrice', 'maxPrice'];

        // console.log(queryObj);

        // Include price range filtering if minPrice or maxPrice is provided
        if (queryObj.minPrice !== 'null' && queryObj.minPrice !== undefined && queryObj.maxPrice !== 'null' && queryObj.maxPrice !== undefined) {
            queryObj.price = { $lte: queryObj.maxPrice, $gte: queryObj.minPrice };
        }


        excludeFields.forEach((el) => delete queryObj[el]);

        // console.log(queryObj);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }
}

export default QueryBuilder;
