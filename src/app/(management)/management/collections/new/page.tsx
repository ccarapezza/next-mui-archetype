import MuiBox from "@/components/client/MuiBox";
import CollectionForm from "@/components/management/collection/CollectionForm";
import PageHeader from "@/components/management/paperbase/PageHeader";

export default async function NewCollectionPage() {
    return (<>
        <PageHeader title="New Collection" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <CollectionForm collectionData={{
                name: ""
            }} />
        </MuiBox>
    </>)
}