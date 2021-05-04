import { Button, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent, useContext, useState } from "react";
import { LoctasticContext } from "../contexts/LoctasticContext";
import NavBar from "./NavBar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        margin: theme.spacing(1),
        width: '120ch',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

export default function Checkout() {
    const classes = useStyles();
    const { customerCart } = useContext(LoctasticContext);
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
                    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
                    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
                    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
                    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        firstLine: "",
        secondLine: "",
        city: "",
        state: "",
        zip: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }

    const handleSelectChange = (event: ChangeEvent<{ name?: string, value: unknown }>) => {
        const name = event.target.name as keyof typeof formState;
        setFormState({ ...formState, [name]: event.target.value })
    }

    return (
        <div className={classes.root}>
            <NavBar />
            <Typography variant="h5">Place your order for ${customerCart.cartTotal()}</Typography>
            <Grid container spacing={3} direction='column'>
                <Grid item>
                    <TextField name="firstName" label="First Name" value={formState.firstName} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <TextField name="lastName" label="Last Name" value={formState.lastName} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <Typography variant="h6">Delivery Address</Typography>
                </Grid>
                <Grid item>
                    <TextField name="firstLine" label="Address Line 1" value={formState.firstLine} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <TextField name="secondLine" label="Address Line 2" value={formState.secondLine} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <TextField name="city" label="City" value={formState.city} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select native name="state" value={formState.state} onChange={handleSelectChange} inputProps={{ name: 'state', id: 'address-state' }}>
                        <option aria-label="None" value="" selected />
                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </Grid>
                <Grid item>
                    <TextField name="zip" label="Zip Code" value={formState.zip} onChange={handleChange} />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">Proceed to payment</Button>
                </Grid>
            </Grid>
        </div>
    )
}