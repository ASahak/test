const UiGenerateMargin = (marginProp, directionProp) => {
    let margin = '';
    let direction;
    const marginDetect = () => {
        return marginProp.reduce((acc, item, index) => {
            acc += item + 'px ';
            return acc
        }, '')
    }
    if (marginProp.constructor === Array || !isNaN(marginProp)) {
        margin = typeof marginProp === 'number' ?
            marginProp + 'px' : marginDetect() || '0px';
    } else margin = 0;
    if (directionProp) {
        direction = {
            ...(directionProp === 'center' ? {
                marginLeft: 'auto',
                marginRight: 'auto',
            }: {}),
            [directionProp === 'right' ? 'marginLeft' : 'marginRight']: 'auto',
        };
    }
    return {
        margin,
        ...direction,
    }
}

const UIGetMarginLeftRight = (margin) => {
    if (margin.constructor === Array) {
        if (margin.length === 1) return 2 * margin[0];
        return ((margin[1] || 0) + (margin[3] || 0)) * ((margin[3] || margin[3] === 0) ? 1 : 2)
    } else if (typeof margin === 'number') return margin * 2
}

export {
    UiGenerateMargin,
    UIGetMarginLeftRight,
};