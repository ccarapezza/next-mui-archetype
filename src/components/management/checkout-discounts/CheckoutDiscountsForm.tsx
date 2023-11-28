"use client"
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Grid, TextField, Divider, FormControlLabel, Switch, Select, MenuItem, Alert, InputLabel, OutlinedInput, FormControl } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack';
import * as yup from 'yup';
import { useEffect, useState } from 'react'

interface ICheckoutDiscountsForm {
    active: boolean
    name: string
    coupon: string
    coupon_type: string
    value: number
    application_type: string,
    uses_per_user: number
}

const schema = yup.object().shape({
    active: yup.boolean().required(),
    name: yup.string().min(3).max(20).required(),
    coupon: yup.string().min(3).max(20).required(),
    coupon_type: yup.string().min(3).max(20).required(),
    value: yup.number().min(0).required(),
    application_type: yup.string().min(3).max(20).required(),
    uses_per_user: yup.number().test({
        name: 'uses_per_user',
        test: function (value, context) {
            const applicationType = context.parent.application_type;
            console.log("applicationType", applicationType);

            if (applicationType === 'forLimitedUsers') {
                return value !== undefined && value >= 0;
            }
            return true;
        },
    }),
}).required();


const saveDiscountsData = async (saveDiscountsData: any) => {
    console.log("collectionData", saveDiscountsData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/checkout-discounts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saveDiscountsData)
    });
    return res.json();
};



export default function CheckoutDiscountsForm() {
    const [showUsesPerUser, setShowUsesPerUser] = useState(false);
    const [messageHelpCoupons, setmessageHelpCoupons] = useState('');
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ICheckoutDiscountsForm>({
        resolver: yupResolver(schema) as any
    });

    // Actualizar el estado para mostrar o ocultar uses_per_user
    const applicationType = watch("application_type");
    useEffect(() => {
        setShowUsesPerUser(applicationType === "forLimitedUsers");
        switch (applicationType) {
            case "global":
                setmessageHelpCoupons("Todos los usuarios podrán utilizar este cupón de forma ilimitada!");
                setValue("uses_per_user", 0);

                break;
            case "forUsers":
                setmessageHelpCoupons("Solo los usuarios registrados podrán utilizar este cupón de forma ilimitada!");
                setValue("uses_per_user", 0);
                break;
            case "forLimitedUsers":
                setmessageHelpCoupons("Solo los usuarios registrados y con usos disponibles podrán utilizar este cupón!");
                break;
            default:
                setmessageHelpCoupons("");
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationType]);

    const defaultValues: ICheckoutDiscountsForm = {
        active: false,
        name: "",
        coupon: "",
        coupon_type: "",
        value: 0,
        application_type: "",
        uses_per_user: 0,
    };

    // Submit
    const onSubmit = async (data: ICheckoutDiscountsForm) => {
        saveDiscountsData(data).then((response) => {
            enqueueSnackbar('Cupón creado con éxito!', { variant: 'success' });
            router.push("/management/checkout-discounts");
            router.refresh();
        }).catch((error) => {
            enqueueSnackbar('Error al guardar el cupón', { variant: 'error' });
            console.log("error", error);
        }).finally(() => {
            console.log("finally");
        });
    };

    return (
        <Card variant='outlined' className='max-w-full lg:max-w-2xl pt-2'>
            {messageHelpCoupons !== '' && (
                <Alert severity="warning" className='mb-2'>{messageHelpCoupons}</Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container padding={2} marginTop={2} paddingTop={0} gap={2}>
                    <Grid item xs={12}>
                        <FormControlLabel control={
                            <Switch defaultChecked
                                {...register("active")}
                            />}
                            label="Activo" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("name")}
                            id="name"
                            label="Nombre del cupón"
                            type="text"
                            size='small'
                            fullWidth
                            error={!!errors.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("coupon")}
                            id="coupon"
                            label="Cupón"
                            type="text"
                            size='small'
                            fullWidth
                            error={!!errors.coupon} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            fullWidth
                            size='small'
                        >
                            <InputLabel id="coupon_type-multiple-chip-label">Descuento por...</InputLabel>
                            <Select
                                {...register("coupon_type")}
                                labelId="coupon_type-multiple-chip-label"
                                id="coupon_type-multiple-chip"
                                label="Tipo de aplicación"
                                size='small'
                                fullWidth
                                input={<OutlinedInput id="coupon_type-multiple-chip" label="Descuento por..." />}
                                defaultValue={defaultValues.coupon_type}
                                error={!!errors.coupon_type}
                            >
                                <MenuItem value={"percentage"}>Porcentaje %</MenuItem>
                                <MenuItem value={"fixedAmount"}>Fijo $</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("value")}
                            id="value"
                            label="Valor del descuento (Fijo $ o Porcentaje %)"
                            type="number"
                            size='small'
                            fullWidth
                            error={!!errors.value} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            fullWidth
                            size='small'
                        >
                            <InputLabel id="application_type-multiple-chip-label">Tipo de aplicación</InputLabel>
                            <Select
                                {...register("application_type")}
                                labelId="application_type-multiple-chip-label"
                                id="application_type-multiple-chip"
                                size='small'
                                fullWidth
                                multiple={false}
                                defaultValue={defaultValues.application_type}
                                error={!!errors.application_type}
                                input={<OutlinedInput id="application_type-multiple-chip" label="Tipo de aplicación" />}
                            >
                                <MenuItem value={"global"}>Global</MenuItem>
                                <MenuItem value={"forUsers"}>Solo Usuarios</MenuItem>
                                <MenuItem value={"forLimitedUsers"}>Cantidad por Usuarios</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {showUsesPerUser && ( // Mostrar el campo solo cuando showUsesPerUser es true
                        <Grid item xs={12}>
                            <TextField
                                {...register("uses_per_user")}
                                id="uses_per_user"
                                label="Usos por usuario"
                                type="number"
                                size="small"
                                fullWidth
                                error={!!errors.uses_per_user}
                            />
                        </Grid>
                    )}
                    <Divider component="hr" className='w-full' />
                    <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                        <Button className='mt-2' type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary">
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}
