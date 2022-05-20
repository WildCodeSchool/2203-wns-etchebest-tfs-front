import formatDate from './formatDate'

test('Should called formatDate and return formatted date',  () => {
    const mockFormatDate = jest.fn().mockImplementation(formatDate);
    mockFormatDate("2022-05-19T08:38:09.876Z");
    expect(mockFormatDate).lastReturnedWith("19/05/2022");
})