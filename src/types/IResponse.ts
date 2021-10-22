import { VRF, VSL } from "./enums";

interface IResponse {
    id: number;
    text: string;
    vrf: VRF;
    vsl: VSL;
}

export default IResponse;