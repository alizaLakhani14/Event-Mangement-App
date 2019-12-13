// import React from "react";
// import { Input } from "antd";
// import { Formik } from "formik";
// import * as Yup from "yup";

// const { TextArea } = Input;

// const CreateEvent = () => {
//   return (
//     <Formik
//       initialValues={{
//         eventName: "",
//         maxMembers: "",
//         description: "",
//         price: "",
//         contactNumber: ""
//       }}

//       onSubmit = {values => {
//           console.log(values);
//       }}
//     >
//       {({
//         values,
//         errors,
//         handleChange,
//         handleSubmit,   
//         isSubmitting
//       }) => (
//         <form>
//           <div className="form-field">
//             <Label htmlFor="eventName">Event Name</Label>
//             <Input
//               type="text"
//               placeholder="Event name"
//               id="eventName"
//               name="eventName"
//               onChange={handleChange}
//             ></Input>
//           </div>
//           <div className="form-field">
//             <Label htmlFor="maxMembers">Maxium Members</Label>
//             <Input type="number" id="maxMembers" name="maxMembers"
//             onChange={handleChange}
//             ></Input>
//           </div>
//           <div className="form-field">
//             <Label htmlFor="description">Event Description</Label>
//             <Input.TextArea
//               placeholder="Describe your event...."
//               type="text"
//               id="description"
//               name="description"
//               autoSize={true}
//               maxLength={1000}
//               onChange={handleChange}
//             ></Input.TextArea>
//           </div>
//           <div className="form-field">
//             <Label htmlFor="price">Price per ticket</Label>
//             <Input type="number" id="price" name="price"></Input>
//           </div>
//           <div className="form-field">
//             <Label htmlFor="contactNumber">Contact Number</Label>
//             <Input
//               type="number"
//               id="contactNumber"
//               name="contactNumber"
//               onChange={handleChange}
//             ></Input>
//           </div>
//           <button className="create-event-button" onClick={handleSubmit}>Create Event</button>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default CreateEvent;
