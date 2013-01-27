/**
 * Flow of inflating report using dojo dgrid
 * @author Jun Zhang
 */
$(document).ready(function() {
    
    var datas = new Array();
    
    // Using ajax post to fetch data stored in database
    $.ajax({
        type: "POST",
        url: "http://"+location.host+"/invoice/controllers/invoiceService.php",
        processData: false,
        contentType: false,
        error: function(jqXHR, textStatus, errorMessage) {
           console.log(errorMessage);
        },
        success: function(data) {
            datas = $.parseJSON(data);
            // This function will only run when callback function success
            // returns.
            require(["dgrid/Grid"], function(Grid){
                var infos = new Array();
                for(var index1 in datas) { 
                    infos[index1] = datas[index1];
                    infos[index1]["invoiceAmount"] = 
                        generateInvoiceAmount(datas[index1].
                        numberOfInvoice);
                }


                var grid = new Grid({
                    columns: {
                        client: "Client Name",
                        numberOfInvoice: "Number of Invoice",
                        invoiceAmount: "Invoice Amount"
                    }
                }, "grid");
                grid.renderArray(infos);
            });  
        } 
    });
        
});

/**
 * Generate how much should the client tollay pay his invoice amount
 * @param int $numberOfInvoice: how many invoice number the client has
 */
function generateInvoiceAmount(numberOfInvoice) {
    var amountBelowFifty = 0;
    var amountBeyondFifty = 0;
        
    if(numberOfInvoice <= 50) {
        amountBelowFifty = numberOfInvoice * 0.5;
    } else {
        amountBeyondFifty = 50 * 0.5 + (numberOfInvoice - 50) * 0.75;
    }
    return amountBelowFifty + amountBeyondFifty;
}



