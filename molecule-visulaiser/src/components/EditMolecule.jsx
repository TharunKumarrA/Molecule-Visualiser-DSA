import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function EditMolecule({
  atomMenuItems,
  bondMenuItems,
  sampleMolecules,
  molecule,
  setMolecule,
  atomsList,
  setAtomsList,
  handleDataFromEditMolecule,
}) {
  const [expandedAccordion, setExpandedAccordion] = useState("panel1");
  const [atomData, setAtomData] = useState({
    atomType: "C",
    hybridization: "sp",
  });
  const [bondData, setBondData] = useState({
    bondFrom: bondMenuItems[0].value,
    bondTo: bondMenuItems[1].value,
    bondType: "single",
  });

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpandedAccordion(newExpanded ? panel : null);
  };

  const handleAtomChange = (e) => {
    const { name, value } = e.target;
    setAtomData((prevData) => ({ ...prevData, [name]: value }));
    console.log("currently selected atom type: ", value);
  };

  const handleBondChange = (e) => {
    const { name, value } = e.target;
    setBondData((prevData) => ({ ...prevData, [name]: value }));
    console.log("currently selected bond type: ", value);
  };

  const handleSubmitAtom = (e) => {
    e.preventDefault();
    const data = {
      type: "atom",
      atomName: atomData.atomType + atomsList.length,
      hybridisation: atomData.hybridization,
      atomSymbol: atomData.atomType,
    };
    handleDataFromEditMolecule(data);
  };

  const handleSubmitBond = (e) => {
    e.preventDefault();
    const data = {
      type: "bond",
      atom1Name: bondData.bondFrom,
      atom2Name: bondData.bondTo,
    };
    handleDataFromEditMolecule(data);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-4/5">
        <Accordion
          expanded={expandedAccordion === "panel1"}
          onChange={handleChangeAccordion("panel1")}
          defaultExpanded={true}
          sx={{ backgroundColor: "#2ABD91" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            ADD ATOMS
          </AccordionSummary>
          <AccordionDetails className="bg-[#1e1e1e] text-white flex flex-col items-center">
            <form
              onSubmit={handleSubmitAtom}
              className="w-full flex flex-col items-center"
            >
              <RadioGroup
                defaultValue="C"
                row
                name="atomType"
                onChange={handleAtomChange}
              >
                {atomMenuItems.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
              <div className="text-center my-2">Hybridization</div>
              <RadioGroup
                defaultValue="sp"
                row
                name="hybridization"
                onChange={handleAtomChange}
              >
                <FormControlLabel value="sp" control={<Radio />} label="sp" />
                <FormControlLabel value="sp2" control={<Radio />} label="sp2" />
                <FormControlLabel value="sp3" control={<Radio />} label="sp3" />
              </RadioGroup>
              <Button
                type="submit"
                variant="outlined"
                sx={{ color: "white", borderColor: "#2ABD91", marginTop: 2 }}
              >
                ADD ATOM
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedAccordion === "panel2"}
          onChange={handleChangeAccordion("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{ backgroundColor: "#2ABD91" }}
          >
            ADD BONDS
          </AccordionSummary>
          <AccordionDetails className="bg-[#1e1e1e] text-white flex flex-col">
            <form
              onSubmit={handleSubmitBond}
              className="w-full flex flex-col items-center"
            >
              <div className="flex flex-row justify-between items-center">
                <Select
                  name="bondFrom"
                  defaultValue={bondMenuItems[0].value}
                  onChange={handleBondChange}
                  sx={{ color: "white" }}
                >
                  {bondMenuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <div>------------------</div>
                <Select
                  name="bondTo"
                  defaultValue={bondMenuItems[1].value}
                  onChange={handleBondChange}
                  sx={{ color: "white" }}
                >
                  {bondMenuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="text-center my-2">Bond Type</div>
              <RadioGroup
                defaultValue="single"
                row
                name="bondType"
                onChange={handleBondChange}
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="single"
                />
                <FormControlLabel
                  value="double"
                  control={<Radio />}
                  label="double"
                />
                <FormControlLabel
                  value="triple"
                  control={<Radio />}
                  label="triple"
                />
              </RadioGroup>
              <Button
                type="submit"
                variant="outlined"
                sx={{ color: "white", borderColor: "#2ABD91", marginTop: 2 }}
              >
                ADD BOND
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedAccordion === "panel3"}
          onChange={handleChangeAccordion("panel3")}
          sx={{ backgroundColor: "#2ABD91" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            EXAMPLES
          </AccordionSummary>
          <AccordionDetails className="bg-[#1e1e1e] text-white flex flex-col items-center">
            <Select defaultValue={sampleMolecules[0]} sx={{ color: "white" }}>
              {sampleMolecules.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "#2ABD91", marginTop: 2 }}
            >
              SHOW MOLECULE
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
