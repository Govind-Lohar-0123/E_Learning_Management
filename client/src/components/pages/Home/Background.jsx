
import { Box, Button, styled, Typography, Link } from "@mui/material"

import { useContext } from "react";
import { context } from "../../../ContextApi";

import { Link as routerLink } from "react-router-dom";
import { getToken } from "../auth/tokenAction"
import { getUser } from "../auth/userAction";

export default function Background({ flag }) {
    const { setOpenSignIn } = useContext(context);


    return (
        <>
            <Box className="position-relative">
                {
                    (flag == false) ?
                        <>
                            <Box >
                                {/* <video className="w-100 h-100" autoPlay muted >
                                    <source src={bg} />
                                </video> */}
                                <img src={`${process.env.PUBLIC_URL}/img/profile.png`} alt=""  className="w-100 h-100 d-block"/>
                            </Box>
                           
                        </>
                        :
                        <Box>
                            <img src={`${process.env.PUBLIC_URL}/img/bg1.png`} className="w-100 h-100 d-block" alt="" />
                        </Box>

                }

            </Box>

        </>
    )
}