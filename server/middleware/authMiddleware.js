
// =========================================================
// Authentication Middleware
// =========================================================

const jwt =
    require("jsonwebtoken");


// =========================================================
// Authentication
// =========================================================

function authMiddleware(
    request,
    response,
    next
) {

    try {

        // =====================================================
        // Get Authorization Header
        // =====================================================

        const authorization =
            request.headers.authorization;


        // =====================================================
        // Check Authorization
        // =====================================================

        if (
            !authorization
        ) {

            return response.status(
                401
            ).json({

                message:
                    "Authentication required."

            });

        }


        // =====================================================
        // Check Bearer Format
        // =====================================================

        if (
            !authorization.startsWith(
                "Bearer "
            )
        ) {

            return response.status(
                401
            ).json({

                message:
                    "Invalid authentication format."

            });

        }


        // =====================================================
        // Get Token
        // =====================================================

        const token =
            authorization.split(
                " "
            )[1];


        // =====================================================
        // Verify Token
        // =====================================================

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // =====================================================
        // Store User ID
        // =====================================================

        request.userId =
            decoded.userId;


        // =====================================================
        // Continue
        // =====================================================

        next();

    }

    catch (
        error
    ) {

        console.error(
            "Authentication Error:",
            error
        );


        return response.status(
            401
        ).json({

            message:
                "Invalid or expired token."

        });

    }

}


// =========================================================
// Export Middleware
// =========================================================

module.exports =
    authMiddleware;