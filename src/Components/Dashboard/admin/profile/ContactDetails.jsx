import DetailListItem from '../../../../Components/Dashboard/admin/profile/DetailListItem'


 const ContactDetails = () => {
    return (
        <section className="contact_details px-6 py-4 bg-white rounded-[10px] myshadow flex-col gap-4 flex">

            <div className="items-center justify-between flex">
                <h3 className="text-slate-700 text-2xl font-normal leading-7">
                    Contact details
                </h3>
                <img src="/Pencil.png" alt="pencil" className="w-6 h-6" />
            </div>

            <DetailListItem
                title={"Home address"}
                detail={"9, wakam street, fisayo close, lagos"}
                padding={"pl-4 py-2"}
            />
            <DetailListItem
                title={"Phone number"}
                detail={"+234 123456789"}
                padding={"pl-4 py-2"}
            />
            <DetailListItem
                title={"Email"}
                detail={"Brooklin@gmail.com"}
                padding={"pl-4 py-2"}
            />
        </section>
    );
};

export default ContactDetails