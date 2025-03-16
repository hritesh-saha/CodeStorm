

import bcrypt from "bcrypt";
import PatientDetails from "../models/PatientDetails.js";
import HospitalStaff from "../models/HospitalStaff.js";

// Patient Login Without JWT
export const PatientLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await PatientDetails.findOne({ email });
        if (!patient) return res.status(404).json({ message: "User not found" });

        const isValid = await bcrypt.compare(password, patient.password);
        if (!isValid) return res.status(401).json({ message: "Invalid Credentials" });

        res.json({ message: "Login Successful", user: { id: patient._id, name: patient.name, email: patient.email, phone: patient.phone } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

