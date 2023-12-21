const App = () => {
    // for merge two type
    type X = {
        a: string
        b: number
    }
    type Y = X & {
        c: string
        d: number
    }
    const data: Y = {
        a: '',
        b: 20,
        c: '',
        d: 20
    }

    // for merge two interface

    interface Person {
        name: string
        age: number
    }
    interface Demo extends Person {
        mobileNo: number
    }
    const personalDetail: Demo = {
        mobileNo: 1212121,
        age: 12,
        name: ''
    }
    //  if we want to merge type into interface and interface into type

    type A = {
        a: string
    }
    interface B extends A {
        data: number
    }

    const finalValue: B = {
        data: 12,
        a: ''
    }
    //
    interface C {
        demo: string
    }
    type H = C & {
        name: string
    }
    const final: H = {
        demo: 'hitesh',
        name: ''
    }

    return <div>App</div>
}

export default App
