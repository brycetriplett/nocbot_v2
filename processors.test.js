const processors = require('./processors.js');


test('View processor returns a block', async () => {
    const result = await processors.telradProcessor({
        command: '/telrad',
        text: 'view 111111111111111',
        user_name: 'testing'
    })

    expect(result.blocks).toBeTruthy();
})