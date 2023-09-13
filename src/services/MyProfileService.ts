//Service object for Product Sequelize Model

import { User } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { userService } from "./UserService";
import S3BucketUtil from "@/utils/S3BucketUtil";

export class MyProfileService {
    getMyProfile = async () => {
        const nextUserSession = await getServerSession(authOptions);
        const userLogged = nextUserSession?.user?.email?await userService.getByEmail(nextUserSession.user.email):null;
        const user = await User.findOne({
            where: {
                id: userLogged?.id
            },
            include: ["roles"]
        });
        const userJson = user?.toJSON();
        if(userJson?.image){
            userJson.image = await S3BucketUtil.getSignedUrlByKey({
                folder: S3BucketUtil.FOLDERS.AVATARS,
                key: userJson.image,
            });
        }
        return userJson;
    }
};

//MyProfileService as a singleton
export const myProfileService = new MyProfileService();