import { supabase } from "@/lib/supabaseClient"

export default async function About() {
  try {
    // Fetch company info
    const { data: info, error: infoError } = await supabase
      .from("company_info")
      .select("*")
      .single();

    if (infoError) {
      console.error("Ошибка загрузки данных:", infoError.message);
      return <div>Ошибка загрузки продукта</div>;
    }

    return (
      <>
      <div className="">
      <div className="pb-5 mx-auto sm:ml-4 pl-4 pr-4 sm:mr-4 lg:ml-32 lg:mr-32 mt-4 mb-4 shadow-xl rounded-lg px-4 bg-white overflow-clip">
        <div className="font-sans align-middle">
          <title>О нас</title>
          <div className="mb-4 w-full" id="about-section">
            <h2 className="text-2xl font-regular m-0 p-0 -mx-4 mt-2 mb-2 px-4 py-3 text-white bg-brown">
              Информация о компании:
            </h2>
            <table className="table-auto w-full border-collapse font-regular">
              <thead className="font-regular border-b-1">
                <tr className="border-b">
                  <th className="pt-2 text-left text-2xl font-light">Параметр</th>
                  <th className="pt-2 text-right text-2xl font-light">Значение</th>
                </tr>
              </thead>
              <tbody className="border-0 font-light text-xl">
                {Array.isArray(info.company_info) && info.company_info.length > 0 ? (
                  info.company_info.map((attribute, index) => (
                    <tr key={index}>
                      <td className="text-left border-b pt-2">
                        {attribute.name || "Не указано"}
                      </td>
                      {/* You need to add the value for the second column */}
                      <td className="text-right border-b pt-2">
                        {attribute.value || "Не указано"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 border border-gray-300">
                      Характеристики не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
	  <div className="mb-4 w-full">
            <h2 className="text-2xl font-regular m-0 p-0 -mx-4 mt-2 mb-2 px-4 py-3 text-white bg-brown">
	    	Организационно-правовая форма и капитал
            </h2>
            <table className="table-auto w-full border-collapse font-regular">
              <thead className="font-regular border-b-1">
                <tr className="border-b">
                  <th className="pt-2 text-left text-2xl font-light">Параметр</th>
                  <th className="pt-2 text-right text-2xl font-light">Значение</th>
                </tr>
              </thead>
              <tbody className="border-0 font-light text-xl">
                {Array.isArray(info.organizational_and_legal_form) && info.organizational_and_legal_form.length > 0 ? (
                  info.organizational_and_legal_form.map((attribute, index) => (
                    <tr key={index}>
                      <td className="text-left border-b pt-2">
                        {attribute.name || "Не указано"}
                      </td>
                      {/* You need to add the value for the second column */}
                      <td className="text-right border-b pt-2">
                        {attribute.value || "Не указано"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 border border-gray-300">
                      Характеристики не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
	  <div className="mb-4 w-full" id="contacts-section">
            <h2 className="text-2xl font-regular m-0 p-0 -mx-4 mt-2 mb-2 px-4 py-3 text-white bg-brown">
	    	Контакты
            </h2>
            <table className="table-auto w-full border-collapse font-regular">
              <thead className="font-regular border-b-1">
                <tr className="border-b">
                  <th className="pt-2 text-left text-2xl font-light">Параметр</th>
                  <th className="pt-2 text-right text-2xl font-light">Значение</th>
                </tr>
              </thead>
              <tbody className="border-0 font-light text-xl">
                {Array.isArray(info.contact_info) && info.contact_info.length > 0 ? (
                  info.contact_info.map((attribute, index) => (
                    <tr key={index}>
                      <td className="text-left border-b pt-2">
                        {attribute.name || "Не указано"}
                      </td>
                      {/* You need to add the value for the second column */}
                      <td className="text-right border-b pt-2">
                        {attribute.value || "Не указано"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 border border-gray-300">
                      Характеристики не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
	   <div className="w-full" id="legal-section">
            <h2 className="text-2xl font-regular m-0 p-0 -mx-4 mt-2 mb-2 px-4 py-3 text-white bg-brown">
	    	Информация для покупателя	
	    </h2>
            <table className="table-auto w-full border-collapse font-regular">
              <thead className="font-regular border-b-1">
                <tr className="border-b">
                  <th className="pt-2 text-left text-2xl font-light">Параметр</th>
                  <th className="pt-2 text-right text-2xl font-light">Значение</th>
                </tr>
              </thead>
              <tbody className="border-0 font-light text-xl">
                {Array.isArray(info.info_for_customers) && info.info_for_customers.length > 0 ? (
                  info.info_for_customers.map((attribute, index) => (
                    <tr key={index}>
                      <td className="text-left border-b pt-2">
                        {attribute.name || "Не указано"}
                      </td>
                      {/* You need to add the value for the second column */}
                      <td className="text-right border-b pt-2">
                        {attribute.value || "Не указано"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-2 border border-gray-300">
                      Характеристики не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
	</div>
	</div>
      </>
    );
  } catch (err) {
    console.error("Произошла ошибка при загрузке данных:", err);
    return <div>Ошибка загрузки данных</div>;
  }
}

