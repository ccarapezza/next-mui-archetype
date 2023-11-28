import createQueryString from "@/utils/RouterUtil"

test(`Testing 'createQueryString' method`, ()=>{
    const queryStringSimple = createQueryString(
        [{
            name: 'exampleLabel',
            value: 'exampleValue'
        }]
    );
    expect(queryStringSimple).toBe("exampleLabel=exampleValue");

    const queryStringMultiple = createQueryString(
        [{
            name: 'exampleLabel',
            value: 'exampleValue'
        },
        {
            name: 'exampleLabel2',
            value: 'exampleValue2'
        }]
    );
    expect(queryStringMultiple).toBe("exampleLabel=exampleValue&exampleLabel2=exampleValue2");

    const concatenateParams = createQueryString(
        [{
            name: 'otherExampleLabel',
            value: 'otherExampleValue'
        }],
        queryStringMultiple
    );
    expect(concatenateParams).toBe("exampleLabel=exampleValue&exampleLabel2=exampleValue2&otherExampleLabel=otherExampleValue");

    const modifiedParams = createQueryString(
        [{
            name: 'exampleLabel',
            value: 'modifiedExampleValue'
        }],
        concatenateParams
    );
    expect(modifiedParams).toBe("exampleLabel=modifiedExampleValue&exampleLabel2=exampleValue2&otherExampleLabel=otherExampleValue");  
})