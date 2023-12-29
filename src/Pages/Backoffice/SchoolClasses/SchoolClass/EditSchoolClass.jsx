import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccountsByCompanyIdQuery } from "../../../../Api/Reducers/accountsApiSlice.js";
import { useGetSchoolClassesByCompanyIdQuery,
    useUpdateSchoolClassMutation } from "../../../../Api/Reducers/schoolClassesApiSlice.js";
import SchoolClassForm from './SchoolClassForm.jsx';

const EditSchoolClass = ({ schoolClassId, companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    
    const [issubschoolClassof, setIssubschoolClassof] = useState();
    const [schoolClassName, setSchoolClassName] = useState();
    const [schoolClassParent, setSchoolClassParent] = useState('dflt');
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => handleModalOpen();



    const { data: schoolClassesList, isSuccess:isSuccessSchoolClasses } = useGetSchoolClassesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => {
            // Filter out the schoolClass with the specific id
            const schoolClassesArray = Object.values(data?.entities);
            const filteredData = schoolClassesArray.filter((acc) => acc.id !== schoolClassId && acc.parent_id === null);
            return {
                data: filteredData,
                isLoading,
                isSuccess
            };
        },
     });
    
     // Get current schoolClass
    const { data: schoolClass, isSuccess:isSuccessOneSchoolClass } = useGetSchoolClassesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.entities[schoolClassId],
            isLoading,
            isSuccess
        }),
    });


    const [updateSchoolClass, { isLoading }] = useUpdateSchoolClassMutation()

    useEffect(() => {
        if (isSuccessOneSchoolClass) {
            // console.log("### EDIT ACCOUNT IS OPEN ### : ", accountType);
            setIssubschoolClassof(schoolClass.parent_id)
            setSchoolClassName(schoolClass.name)
            setSchoolClassParent(schoolClass.parent_id)
        }
    }, [isSuccessOneSchoolClass, 
        schoolClass.name,
        schoolClass.parent_id,])

    const canSave = [schoolClassName].every(Boolean) && !isLoading;

    const submitSchoolClass = async (toSubmit) => {
        if (canSave) {
            if (issubschoolClassof) {
                if (schoolClassParent) {
                    await updateSchoolClass(toSubmit).unwrap()
                    resetForm(toSubmit)
                }
            } else {
                await updateSchoolClass(toSubmit).unwrap()
                resetForm(toSubmit)
            }
        }
    }

    const resetForm = () => {
        setSchoolClassName('')
        setSchoolClassParent(null)
        setActiveApplyBtn(false)
        closeModal()
    }

    return (
        <SchoolClassForm
        schoolClassId={schoolClassId}
        companyId={companyId}
        modalOpen={modalOpen}
        schoolClassesList={schoolClassesList}
        isSuccessSchoolClasses={isSuccessSchoolClasses}
        activeApplyBtn={activeApplyBtn}
        setActiveApplyBtn={setActiveApplyBtn}
        issubschoolClassof={issubschoolClassof}
        setIssubschoolClassof={setIssubschoolClassof}
        schoolClassName={schoolClassName}
        setSchoolClassName={setSchoolClassName}
        schoolClassParent={schoolClassParent}
        setSchoolClassParent={setSchoolClassParent}
        submitSchoolClass={submitSchoolClass}
        closeModal={closeModal}
        canSave={canSave}
        />
    )
}

export default EditSchoolClass