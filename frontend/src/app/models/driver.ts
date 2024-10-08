import { Package } from "./package";

/**
 * Driver model.
 */
export class Driver {
    _id: string;
    driver_id: string;
    driver_name: string;
    driver_department: string;
    driver_license: string;
    driver_is_active: boolean;
    assigned_packages: Package[];  
    created_at: Date;
    
    /**
     * Constructor to create a new driver.
     */
    constructor() {
        // might be changed
        this._id = "";
        this.driver_id = "";
        this.driver_name = "";
        this.driver_department = "";
        this.driver_license = "";
        this.driver_is_active = false;
        this.assigned_packages = [];
        this.created_at = new Date();
    }   
}