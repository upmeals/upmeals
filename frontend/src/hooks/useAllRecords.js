import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { apiOperations } from "../store/ducks/api";

const useAllRecords = (
    resource,
    options = {},
    callback = () => { },
    deps = []
) => {
    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [recordIds, setRecordIds] = useState([]);
    const dispatch = useDispatch();

    const unorderedRecords = useSelector((state) =>
        Object.values(state.api.entities[resource] || {}).filter((item) =>
            recordIds.includes(item.id)
        )
    );
    const records = _.sortBy(unorderedRecords, ({ id }) => recordIds.indexOf(id));
    const onSuccess = useCallback(callback, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setLoading(true);
        dispatch(apiOperations.indexAll(resource, options))
            .then((result) => {
                setRecordIds(result);
                return result;
            })
            .then(onSuccess)
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [onSuccess, JSON.stringify(options), resource, counter, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, refresh: () => setCounter(counter + 1), records };
};

export default useAllRecords;
