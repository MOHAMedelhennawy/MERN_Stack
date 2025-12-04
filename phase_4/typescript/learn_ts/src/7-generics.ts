type MyGenericType<TData> = {
    data: TData
};

type Example1 = MyGenericType<{
    firstName: string,
}>;

type Example2 = MyGenericType<string>;