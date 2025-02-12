import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

interface MoreInfoProps {
    objetive: string;
    city: string;
    crop: string[];
    institution: string[];
    guesType: string[];
}

const MoreInfo: React.FC<MoreInfoProps> = ({ objetive, city, crop, institution, guesType }) => {
    return (
        <Accordion>
            <AccordionItem title="Más información">
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Objetivo principal:</strong>
                        <span>{objetive}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Ciudad:</strong>
                        <span>{city}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Sistema productivo:</strong>
                        <span>{crop.join(", ")}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Instituciones organizadoras:</strong>
                        <span>{institution.join(", ")}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Tipo de invitados:</strong>
                        <span>{guesType.join(", ")}</span>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    );
};

export default MoreInfo;
