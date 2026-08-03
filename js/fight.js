// =========================================================
// Hide Choose Buttons Temporarily
// =========================================================

function hideChooseButtonsTemporarily() {

    const choosePlayerA =
        document.getElementById(
            "choosePlayerA"
        );


    const choosePlayerB =
        document.getElementById(
            "choosePlayerB"
        );


    // =====================================================
    // Hide Buttons
    // =====================================================

    if (
        choosePlayerA
    ) {

        choosePlayerA.style.visibility =
            "hidden";

    }


    if (
        choosePlayerB
    ) {

        choosePlayerB.style.visibility =
            "hidden";

    }


    // =====================================================
    // Show Buttons After 2 Seconds
    // =====================================================

    setTimeout(
        function() {

            if (
                choosePlayerA
            ) {

                choosePlayerA.style.visibility =
                    "visible";

            }


            if (
                choosePlayerB
            ) {

                choosePlayerB.style.visibility =
                    "visible";

            }

        },
        2000
    );

}