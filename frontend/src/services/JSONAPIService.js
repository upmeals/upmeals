import { authApiHost, servicesMap } from '../config/constants';
import _ from 'lodash';
import BaseHTTPService from './BaseHTTPService'
import { stringify } from 'query-string';



const toLinkObject = (relationshipData) => {
    if (relationshipData) {
        if (Array.isArray(relationshipData)) {
            return relationshipData.map(toLinkObject);
        }
        return {
            id: relationshipData.id,
            type: relationshipData.type,
        };
    }
    return null;
};



export default class JSONAPIService extends BaseHTTPService {
    constructor(resource) {
        const resource_path = resource.replace(/_/g, "-");
        const baseURL = servicesMap[resource] || authApiHost
        super(`${baseURL}/v1/${resource_path}`);
        this.resource_name = resource
        this.resource_path = resource_path
    }

    findRelatedRecord({ id, type }, { included }) {
        if (!included) {
            return undefined
        }
        return included.find((record) => record.id === id && record.type === type)
    }

    buildUrlWithOptions(url, options) {
        const { include, fields, filters, page, sort } = _.defaults(options, {
            include: [],
            filters: {},
            page: {},
            sort: [],
            fields: {},
        });
        let params = {}

        // Return formatted filters
        if (_.keys(filters).length) {
            _.keys(filters).map((key) => {
                if (filters[key]) {
                    let filterName = `filter[${key}]`
                    let filterValue = filters[key]
                    if (_.isArray(filterValue)) {
                        filterValue = filterValue.join(',')
                    }
                    params[filterName] = filterValue
                }
                return params;
            })
        }

        // Return formatted pages
        if (_.keys(page).length) {
            _.keys(page).map((key) => {
                params[`page[${key}]`] = page[key];
                return params;
            });
        }

        // Return formatted sorts
        if (_.isArray(sort) && sort.length) {
            params["sort"] = sort.join(",");
        } else if (sort.orderBy) {
            params["sort"] =
                (sort.order.toLowerCase() === "desc" ? "-" : "") + sort.orderBy;
        }

        // Return formatted fields
        _.each(fields, (resourceFields, resourceType) => {
            params[`fields[${resourceType}]`] = resourceFields.join(",");
        });

        // Return formatted includes
        if (include.length) {
            params.include = include.join(",");
        }

        // Return url with formatted params
        if (_.keys(params).length) {
            url += `?${stringify(params)}`;
        }

        return url;
    }

    describe(useOptionsMethod = true, options = {}) {
        if (useOptionsMethod) {
            return this.authOptions(this.buildUrlWithOptions("", options));
        }
        return this.authGet(this.buildUrlWithOptions("/options/", options));
    }

    index(options = {}, config) {
        return this.authGet(this.buildUrlWithOptions("/", options), config);
    }

    get(record_id, options = {}) {
        return this.authGet(this.buildUrlWithOptions(`/${record_id}/`, options));
    }

    create(attributes, relationships) {
        const payload = {
            type: this.resource_name,
            attributes,
        };
        if (relationships) {
            payload.relationships = {};
            Object.keys(relationships).forEach((relation_name) => {
                payload.relationships[relation_name] = {
                    data: toLinkObject(relationships[relation_name]),
                };
            });
        }
        return this.authPost("/", { data: payload });
    }

    update(record_id, attributes, relationships, options = {}) {
        const payload = {
            type: this.resource_name,
            attributes,
            id: record_id,
        }
        if (relationships) {
            payload.relationships = {};
            Object.keys(relationships).forEach((relation_name) => {
                payload.relationships[relation_name] = {
                    data: toLinkObject(relationships[relation_name]),
                }
            })
        }
        return this.authPatch(this.buildUrlWithOptions(`/${record_id}/`, options), {
            data: payload,
        })
    }

    delete(record_id) {
        return this.authDelete(`/${record_id}/`);
    }

    fetch_related(record_id, relation_name, options) {
        return this.authGet(
            this.buildUrlWithOptions(
                `/${record_id}/${relation_name.replace("_", "-")}`,
                options
            )
        )
    }

    add_related(record_id, relation_name, related) {
        return this.authPost(
            `/${record_id}/relationships/${relation_name.replace("_", "-")}`,
            {
                data: related,
            }
        )
    }

    remove_related(record_id, relation_name, related) {
        return this.authDelete(
            `/${record_id}/relationships/${relation_name.replace("_", "-")}`,
            {
                data: { data: related },
            }
        )
    }

    rawUpload(id, subPath, files = {}) {
        const payload = new FormData();
        Object.keys(files).forEach((key) => payload.append(key, files[key]));
        return this.authPut(`/${id}${subPath}`, payload);
    }

    rawPost = (id, subPath, payload, options = {}) => {
        return this.authPost(
            this.buildUrlWithOptions(`/${id}${subPath}`, options),
            payload,
            options.config
        );
    };

    rawDelete = (id, prefixPath, suffixPath, payload = {}, options = {}) => {
        return this.authDelete(
            this.buildUrlWithOptions(`/${prefixPath}${id}${suffixPath}/`, options),
            payload,
            options.config
        );
    };
}

