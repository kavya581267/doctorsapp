import { View } from "react-native";
import Registration from "./Registration";
import YesOrNo from "./YesOrNo";
import { useState } from "react";



export default function PatientRegistration() {
    const [createUserAccount, setCreateUserAccount] = useState(null);
    const initialFields = [
        { key: "clinicId", label: "ClinicId", required: true },
        { key: "firstName", label: "FirstName", required: true },
        { key: "lastName", label: "LastName", required: true },
        { key: "email", label: "Email", keyboardType: "email-address", required: true },
        { key: "dateOfBirth", label: "DateOfBirth", required: true },
        { key: "gender", label: "Gender", required: true },
        { key: "phone", label: "Phone", keyboardType: "phone-pad", maxLength: 10, required: true },
        { key: "bloodGroup", label: "Blood Group", required: true },
    ];

    const additionalFields = [
        { key: "address", label: "Address" },
        { key: "city", label: "City" },
        { key: "state", label: "State" },
        { key: "zipCode", label: "ZipCode" },
        { key: "country", label: "Country" },
        { key: "emergencyContactName", label: "Emergency Contact Name" },
        { key: "emergencyContactPhone", label: "Emergency Contact Phone" }
    ]

    const fields = createUserAccount ? [...initialFields, ...additionalFields] : initialFields;
    return (
        <View style={{ flex: 1 }}>

            <Registration title="Add New Patient" url="" fields={fields} />

            {createUserAccount === null && (
                <YesOrNo
                    question="Do you want to create an account?"
                    onSelect={setCreateUserAccount}
                    selectedValue={createUserAccount}
                />
            )}




        </View>

    )
}