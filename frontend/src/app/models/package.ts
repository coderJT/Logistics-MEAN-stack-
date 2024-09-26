export class Package {
    _id?: string;
    package_id?: string;
    package_title: string;
    package_weight: number;
    package_destination: string;
    package_description: string;
    is_allocated: boolean;
    driver_mongoose_id?: string;

    constructor() {
        this.package_id = "";
        this.package_title = "";
        this.package_weight = 0;
        this.package_destination = "";
        this.package_description = "";
        this.is_allocated = false;
        this.driver_mongoose_id = "";
    }
}