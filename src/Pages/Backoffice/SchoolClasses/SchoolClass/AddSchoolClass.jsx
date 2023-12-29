import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAccountsByCompanyIdQuery } from "../../../../Api/Reducers/accountsApiSlice.js";
import { useGetSchoolClassesByCompanyIdQuery,
    useAddNewSchoolClassMutation } from "../../../../Api/Reducers/schoolClassesApiSlice.js";
import SchoolClassForm from './SchoolClassForm.jsx';

const AddSchoolClass = ({ companyId, handleModalOpen, modalOpen}) => {
    const navigate = useNavigate();
    
    const [issubschoolClassof, setIssubschoolClassof] = useState();
    const [schoolClassName, setSchoolClassName] = useState();
    const [schoolClassParent, setSchoolClassParent] = useState('dflt');
    const [activeApplyBtn, setActiveApplyBtn] = useState(false);

    const closeModal = () => handleModalOpen();


    const { data: schoolClassesList, isSuccess:isSuccessSchoolClasses } = useGetSchoolClassesByCompanyIdQuery(companyId, {
        selectFromResult: ({ data, isLoading, isSuccess }) => {            
            const schoolClassesArray = Object.values(data?.entities);
            const filteredData = schoolClassesArray.filter((acc) => acc.parent_id === null);
            return {
                data: filteredData,
                isLoading,
                isSuccess
            };
        },
     });

    const [addNewSchoolClass, { isLoading }] = useAddNewSchoolClassMutation()

    const canSave = [schoolClassName].every(Boolean) && !isLoading;

    const submitSchoolClass = async (toSubmit) => {
        
        if (canSave) {
            if (issubschoolClassof) {
                if (schoolClassParent) {
                    await addNewSchoolClass(toSubmit).unwrap()
                    resetForm(toSubmit)
                }
            } else {
                await addNewSchoolClass(toSubmit).unwrap()
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

export default AddSchoolClass