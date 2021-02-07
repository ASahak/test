import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Input,
    Select,
    InputLikeSelect,
    DatePicker,
    TimePicker,
    SimpleDialog,
    Phone,
    RangeSlider,
    Tag,
} from '../Components/Shared/UI';
import { useForm } from 'react-hook-form';


const UiKit = (props) => {
    const [dialogOpen1, setDialogOpen1] = useState(false);
    const [selectedTags, setSelectedTags] = useState(['some-tag-2']);
    const [age, setAge] = useState();
    const [age2, setAge2] = useState();
    const [age3, setAge3] = useState();
    const [age4, setAge4] = useState();
    const [age5, setAge5] = useState();
    const [direction, setDirection] = useState();
    const [direction2, setDirection2] = useState('month');
    const [loadingIcon, setLoadingIcon] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm({
        mode: 'onKeypress',
    });
    const selectOptions = [
        {title: 'Ten', value: 101, avatar: '/images/avatar.png'},
        {title: 'Twenty', value: 201},
        {title: 'Thirty', value: 30},
        {title: 'Thirty 2', value: 309, avatar: '/images/avatar.png'},
        {title: 'Thirty 3', value: 301, avatar: '/images/avatar.png'},
        {title: 'Thirty 4', value: 302},
        {title: 'Thirty 5', value: 303, avatar: '/images/avatar.png'},
        {title: 'Thirty 6', value: 304},
        {title: 'Thirty 7', value: 305, avatar: '/images/avatar.png'},
    ];
    const selectOptions2 = [
        {title: 'Ten', value: 101, icon: 'calendar'},
        {title: 'Twenty', value: 201, icon: 'office'},
        {title: 'Thirty 2', value: 309, icon: 'newspaper'},
        {title: 'Thirty 3', value: 301, icon: 'pencil'},
        {title: 'Thirty 4', value: 302, icon: 'quill'},
        {title: 'Thirty 5', value: 303, icon: 'pen'},
        {title: 'Thirty 6', value: 304, icon: 'blog'},
        {title: 'Thirty', value: 30},
        {title: 'Thirty 7', value: 305, icon: 'calendar'},
    ];
    const selectOptions3 = [
        {title: 'Ten', value: 10},
        {title: 'Twenty', value: 20},
        {title: 'Thirty', value: 31},
        {title: 'Thirty 2', value: 32},
        {title: 'Thirty 3', value: 33},
        {title: 'Thirty 4', value: 34},
        {title: 'Thirty 5', value: 35},
        {title: 'Thirty 6', value: 36},
        {title: 'Thirty 7', value: 37},
    ];
    const selectOptions4 = [
        {title: 'Ten', value: 101},
        {title: 'Twenty', value: 201},
        {title: 'Thirty', value: 30},
        {title: 'Thirty 2', value: 309},
        {title: 'Thirty 3', value: 301},
        {title: 'Thirty 4', value: 302},
        {title: 'Thirty 5', value: 303},
        {title: 'Thirty 6', value: 304},
        {title: 'Thirty 7', value: 305},
    ];
    const selectOptions5 = [
        {title: 'Ten', value: 10},
        {title: 'Twenty', value: 20},
        {title: 'Thirty', value: 31},
        {title: 'Thirty 2', value: 32},
        {title: 'Thirty 3', value: 33},
        {title: 'Thirty 4', value: 34},
        {title: 'Thirty 5', value: 35},
        {title: 'Thirty 6', value: 36},
        {title: 'Thirty 7', value: 37},
    ];
    const selectOptions6 = [
        {title: '3', value: 3},
        {title: '4', value: 4},
        {title: '5', value: 5},
        {title: '6', value: 6},
    ];
    const selectOptions7 = [
        {title: 'Day', value: 'day'},
        {title: 'Month', value: 'month'},
        {title: 'Year', value: 'year'},
        {title: 'Century', value: 'century'},
    ]

    const isSelectedTag = useCallback((id) => {
        return selectedTags.includes(id)
    }, [selectedTags]);

    const changeSelectedTag = useCallback((id) => {
        let tags = selectedTags;
        if (tags.includes(id)) tags = tags.filter(e => e !== id);
        else tags.push(id);

        setSelectedTags([...tags])
    }, [selectedTags]);

    const change = () => setLoadingIcon(!loadingIcon)
    return (
        <div style={{backgroundColor: '#153F8F', padding: '40px'}}>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tag
                    id={'some-tag'}
                    text="Escort some tag"
                    margin={[10, 10, 30, 0]}
                    width={300}
                    toggle={(id) => changeSelectedTag(id)}
                    selected={isSelectedTag('some-tag')}
                    withX={true}
                    count={100}
                    size={'md'}
                />
                <Tag
                    size={'md'}
                    id={'some-tag-2'}
                    text="Escort some tag 2"
                    margin={[10, 10, 30]}
                    toggle={(id) => changeSelectedTag(id)}
                    // width={300}
                    selected={isSelectedTag('some-tag-2')}
                    // withX={true}
                    count={10}
                />
                <Tag
                    size={'md'}
                    id={'some-tag-3'}
                    text="Escort some tag 3"
                    margin={[10, 10, 30]}
                    toggle={(id) => changeSelectedTag(id)}
                    width={300}
                    selected={isSelectedTag('some-tag-3')}
                    // withX={true}
                    // count={10}
                />
                <Tag
                    disabled={true}
                    size={'md'}
                    id={'some-tag-4'}
                    text="Disabled"
                    margin={[10, 10, 30]}
                    toggle={(id) => changeSelectedTag(id)}
                    selected={isSelectedTag('some-tag-4')}
                    // withX={true}
                    // count={10}
                />
            </div>
            <div style={{display: 'flex'}}>
                <RangeSlider
                    label={{title: "Label"}}
                    sizeOption="m"
                    helperText="Range Picker"
                    disabled={true}
                    // min={20}
                    // max={90}
                    value={[22]}
                    margin={[0, 10, 30, 0]}
                />
                <RangeSlider
                    label={{title: "Label"}}
                    margin={[0, 10, 30, 30]}
                    sizeOption="m"
                    helperText="Range Picker"
                    min={20}
                    max={90}
                    value={[22, 89]}
                />
            </div>
            <div style={{display: 'flex'}}>
                {/*<Phone />*/}
            </div>
            <div style={{display: 'flex'}}>
                <Button
                    icon={{className: 'icon-menu', direction: 'left', loading: loadingIcon}}
                    margin={[10, 10, 30, 0]}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'Show Dialog'}
                    typeButton={'primary'}
                    onClick={() => setDialogOpen1(true)}
                />
                <SimpleDialog
                    open={dialogOpen1}
                    onClose={() => setDialogOpen1(false)}
                    onOk={() => setDialogOpen1(false)}
                    // disableOkBtn={true}
                    title="Use Google's location service?"
                    actions={{cancel: 'Close', ok: 'Save'}}
                    maxWidth={'xs'}
                    actionsVertical={false}
                    fullWidth={true}
                >
                    <div>
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                        <Input
                            type={'text'}
                            margin={[20, 0]}
                            likeMaterialInput={true}
                            label={{title: "Label", color: '#020202'}}
                            name={'href'}
                            theme={'light'}
                            placeholder="Phone mask"
                            size={'sm'}
                            fullWidth={true}
                        />
                    </div>
                </SimpleDialog>
            </div>
            <div style={{display: 'flex'}}>
                <TimePicker
                    width={'280'}
                    label={{title: "Time Picker", color: '#fff'}}
                    placeholder="hh:mm"
                    value={'13:25'}
                    margin={[0, 10, 20, 0]}
                    options={{start: '13:00', interval: '5', end: '22:00'}}
                    theme={'light'}
                    size={'md'}
                    // fullWidth={true}
                    // direction={'center'}
                    // required={true}
                    disabled={false}
                />
                <TimePicker
                    options={{start: '13:00', interval: 5, end: '14:30'}}
                    disabled={false}
                    width={'280'}
                    label={{title: "Time Picker Slide icons", color: '#fff'}}
                    placeholder="hh:mm"
                    value={'14:00'}
                    margin={[0, 10, 20, 0]}
                    theme={'dark'}
                    // handleChange={(e) => setAge(e.target.value)}
                    // options={selectOptions}
                    size={'md'}
                    slideByArrows={true}
                    // fullWidth={true}
                    // direction={'center'}
                    helperText="Select Time"
                    // required={true}
                />
            </div>
            <div style={{display: 'flex'}}>
                <DatePicker
                    label={{title: 'Date picker Light', color: '#fff'}}
                    margin={[0, 0, 20]}
                    // width={'240px'}
                    shouldDisablePastDate={false}
                    theme={'light'}
                    required={true}
                    disabled={false}
                    size={'md'}
                    // fullWidth={true}
                    value={new Date('Thu Jan 21 2021 16:26:37 GMT+0400 (Armenia Standard Time)')}
                    format="MM/dd/yyyy"
                />
                <DatePicker
                    label={{title: 'Date picker Dark', color: '#fff'}}
                    margin={[0, 0, 20, 20]}
                    // width={'240px'}
                    theme={'dark'}
                    shouldDisablePastDate={true}
                    required={true}
                    size={'md'}
                    // fullWidth={true}
                    format="MM/dd/yyyy"
                    value={new Date('Thu Jan 25 2021 16:26:37 GMT+0400 (Armenia Standard Time)')}
                    slideByArrows={true}
                />
                <DatePicker
                    label={{title: 'Date picker Slide arrows', color: '#fff'}}
                    margin={[0, 0, 20, 20]}
                    // width={'240px'}
                    theme={'light'}
                    shouldDisablePastDate={true}
                    required={false}
                    disabled={false}
                    size={'md'}
                    // fullWidth={true}
                    slideByArrows={true}
                    format="MM/dd/yyyy"
                    value={new Date('Thu Jan 23 2021 16:26:37 GMT+0400 (Armenia Standard Time)')}
                />

            </div>
            <div style={{display: 'flex'}}>
                <InputLikeSelect
                    label={{title: 'Day', color: '#fff'}}
                    margin={[0, 0, 20]}
                    width={'100px'}
                    theme={'light'}
                    required={true}
                    disabled={false}
                    size={'md'}
                    placeholder={"dd"}
                    options={selectOptions6}
                    change={(direction) => setDirection(direction)}
                    value={direction}
                />
                <InputLikeSelect
                    disabled={false}
                    label={{title: 'Periods', color: '#fff'}}
                    margin={[0, 10, 20]}
                    width={'150px'}
                    theme={'dark'}
                    helperText={'Please Select Periods'}
                    placeholder={"Periods"}
                    options={selectOptions7}
                    change={(direction) => setDirection2(direction)}
                    value={direction2}
                />
            </div>
            <div style={{display: 'flex'}}>
                <Select
                    // disabled={true}
                    width={'280'}
                    label={{title: "With Avatar", color: '#fff'}}
                    placeholder="Avatar"
                    value={age}
                    margin={[0, 10, 20, 0]}
                    theme={'dark'}
                    handleChange={(e) => setAge(e.target.value)}
                    options={selectOptions}
                    size={'md'}
                    withAvatar={true}
                    // fullWidth={true}
                    // direction={'center'}
                    helperText="Some Helper Text"
                    // required={true}
                />
                <Select
                    disabled={false}
                    width={'280'}
                    label={{title: "With Icon", color: '#fff'}}
                    placeholder="Icon"
                    value={age2}
                    margin={[0, 10, 20, 0]}
                    theme={'light'}
                    handleChange={(e) => setAge2(e.target.value)}
                    options={selectOptions2}
                    size={'md'}
                    withIcon={true}
                    // fullWidth={true}
                    // direction={'center'}
                    required={true}
                />
            </div>
            <div style={{display: 'flex'}}>
                <Select
                    // disabled={true}
                    width={'280'}
                    label={{title: "Dark Select", color: '#fff'}}
                    placeholder="Label String"
                    value={age3}
                    theme={'dark'}
                    handleChange={(e) => setAge3(e.target.value)}
                    options={selectOptions3}
                    size={'md'}
                    // fullWidth={true}
                    // direction={'center'}
                    // margin={[10, 20, 30]}
                    // helperText="Some Helper Text"
                    // required={true}
                />
                <Select
                    width={'280'}
                    // disabled={true}
                    label={{title: "Autocomplete Select", color: '#fff'}}
                    placeholder="Label String"
                    value={age4}
                    margin={[0, 10]}
                    theme={'dark'}
                    handleChange={(e) => setAge4(e.target.value)}
                    options={selectOptions4}
                    size={'md'}
                    // fullWidth={true}
                    // direction={'center'}
                    required={true}
                    autocomplete={true}
                    multiple={false}
                />
                <Select
                    disabled={false}
                    width={'280'}
                    label={{title: "Light Select", color: '#fff'}}
                    placeholder="Label String"
                    value={age5}
                    margin={[0, 10]}
                    theme={'light'}
                    handleChange={(e) => setAge5(e.target.value)}
                    options={selectOptions5}
                    size={'md'}
                    // fullWidth={true}
                    // direction={'center'}
                    helperText="Some Helper Text"
                    // required={true}
                />
            </div>
            <div style={{display: 'flex'}}>

                <Button
                    icon={{className: 'icon-menu', direction: 'left', loading: loadingIcon}}
                    margin={10}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'My Button'}
                    typeButton={'primary'}
                    onClick={() => change()}
                />
                <Button
                    margin={10}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'My Button'}
                    typeButton={'cta'}
                />
                <Button
                    margin={10}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'My Button'}
                    typeButton={'default'}
                />
                <Button
                    margin={10}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'My Button'}
                    typeButton={'white-bg'}
                />
                <Button
                    margin={10}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'My Button'}
                    typeButton={'alt'}
                />
                <Button
                    margin={10}
                    size={'md'}
                    fullWidth={false}
                    disabled={false}
                    text={'My Button'}
                    typeButton={'alert'}
                />

            </div>
            <div style={{backgroundColor: '#fff', padding: '30px 5px'}}>
                <Input
                    type={'checkbox'}
                    margin={[10, 10]}
                    label={{title: "Label", color: '#020202'}}
                    name={'href'}
                    attr={{checked: true}}
                    theme={'light'}
                    size={'md'}
                />
            </div>
            <div>
                <Input
                    type={'checkbox'}
                    margin={[10, 10]}
                    label={{title: "Label", color: '#fff'}}
                    theme={'dark'}
                    name={'href2'}
                    size={'md'}
                />
                <Input
                    type={'radio'}
                    theme={'dark'}
                    attr={{checked: true}}
                    margin={[10, 10]}
                    label={{title: "Label", color: '#fff'}}
                    name={'href1'}
                />
                <div style={{backgroundColor: '#fff', padding: '30px 5px'}}>
                    <Input
                        type={'radio'}
                        theme={'light'}
                        margin={[10, 10]}
                        label={{title: "Label", color: '#020202'}}
                        name={'href1'}
                    />
                </div>
                <Input
                    label={{title: "Number", color: '#fff'}}
                    name="birth"
                    type="number"
                    margin={[15, 10]}
                    // readonly={true}
                    value={88}
                    required={true}
                    width={'150px'}
                    placeholder="Birth"
                    // helperText="Helper Text"
                    // maxCounter={150}
                    size="sm"/>
                <Input
                    id={"some-id"}
                    label={{title: "Label", color: '#fff'}}
                    name="email"
                    type="password"
                    margin={[15, 10]}
                    refBind={register({
                        required: 'Please complete this mandatory field',
                        pattern: {
                            value: /\d+/i,
                            message: 'Please input only digits',
                        }
                    })}
                    // readonly={true}
                    value={88}
                    required={true}
                    passwordEye={true}
                    fullWidth={false}
                    width={'150px'}
                    errors={errors.email && errors.email.message}
                    placeholder="Password"
                    // helperText="Helper Text"
                    // maxCounter={150}
                    size="sm"/>
                <Input
                    // readonly={true}
                    // icon={{className: 'icon-home', onClick: () => change()}}
                    label={{title: "Label", color: '#fff'}}
                    margin={[5, 10]}
                    name="desc"
                    direction={'left'}
                    textArea={{cols: 40, rows: 5}}
                    attr={{placeholder: 'fff'}}
                    refBind={register({
                        required: 'Please complete this mandatory field',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Please write your email address in format: yourname@example.com',
                        }
                    })}
                    value={67676}
                    required={true}
                    theme={'dark'}
                    // maxCounter={15}
                    width={'350px'}
                    fullWidth={false}
                    errors={errors.desc && errors.desc.message}
                    placeholder="Textarea"
                    size="md"/>

                <Input
                    label={{title: "Label", color: '#fff'}}
                    name="text"
                    type="text"
                    margin={[5, 10]}
                    refBind={register({
                        required: 'Please complete this mandatory field',
                    })}
                    icon={{className: 'icon-cart'}}
                    // readonly={true}
                    // required={true}
                    fullWidth={false}
                    theme={'dark'}
                    width={'150px'}
                    errors={errors.text && errors.text.message}
                    placeholder="Text"
                    // helperText="Helper Text"
                    // maxCounter={150}
                    size="md"/>

                <Input
                    transparentInput={true}
                    label={{title: "Label", color: '#fff'}}
                    name="cart"
                    type="text"
                    margin={[5, 10]}
                    refBind={register({
                        required: 'Please complete this mandatory field Please complete this mandatory field Please complete this mandatory field',
                    })}
                    icon={{className: 'icon-cart'}}
                    // readonly={true}
                    required={true}
                    fullWidth={false}
                    width={'150px'}
                    errors={errors.cart && errors.cart.message}
                    placeholder="Text"
                    // helperText="Helper Text"
                    // maxCounter={150}
                    size="md"/>

                <Input
                    transparentInput={true}
                    label={{title: "Label", color: '#fff'}}
                    name="ww"
                    type="text"
                    margin={[5, 10]}
                    textArea={{cols: 20, rows: 5}}
                    refBind={register({
                        required: 'Please complete this mandatory field ',
                    })}
                    icon={{className: 'icon-pencil'}}
                    // readonly={true}
                    required={true}
                    fullWidth={false}
                    width={'150px'}
                    errors={errors.ww && errors.ww.message}
                    placeholder="Text"
                    // helperText="Helper Text"
                    // maxCounter={150}
                    size="md"/>

                <form style={{width: '50%', margin: 'auto'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Input
                            label={{title: "Name", color: '#fff'}}
                            name="name"
                            type="text"
                            margin={[15, 5, 15, 0]}
                            refBind={register({
                                required: 'Please complete this mandatory field',
                                minLength: {
                                    value: 2,
                                    message: 'The minLength must be more then 2'
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'The maxLength must be les then 255'
                                },
                                pattern: {
                                    value: /^[a-zA-Z ]+$/iu,
                                    message: 'Please write your name in format: John Doe',
                                }

                            })}
                            // readonly={true}
                            required={true}
                            errors={errors.name && errors.name.message}
                            placeholder="Full Name"
                            helperText="FullName must be link this Joh Doe"
                            width={'50%'}
                            maxCounter={50}
                            transparentInput={true}
                            size="md"/>
                        <Input
                            transparentInput={true}
                            label={{title: "Name", color: '#fff'}}
                            name="email1"
                            type="email"
                            margin={[15, 0, 15, 5]}
                            width={'50%'}
                            refBind={register({
                                required: 'Please complete this mandatory field',
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Please write your email address in format: yourname@example.com',
                                }
                            })}
                            // readonly={true}
                            required={true}
                            errors={errors.email1 && errors.email1.message}
                            placeholder="Email"
                            maxCounter={50}
                            size="md"/>
                    </div>
                </form>
            </div>


        </div>
    )
}
export default UiKit;