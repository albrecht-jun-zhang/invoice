<?php
require_once(dirname(__FILE__)."/../models/invoiceModel.php");

/**
 * Service for ajax post from loadData.js.
 * Fetch data from db and echo back to loadData.js
 * @author Jun Zhang
 */

$invoiceModel = new InvoiceModel();
$tableName = "invoice";
$datas = $invoiceModel->selectAllInfo($tableName);

$datas = json_encode($datas);
echo $datas;

?>
